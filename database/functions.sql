-- ==============================================================================
-- YO MERCO (COLOMBIA) - FUNCIONES SQL OPTIMIZADAS (RPC EN SUPABASE)
-- Motores de cálculo financiero, podio de ahorro, modo presupuesto y canasta híbrida
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. FUNCIÓN: calculate_basket_comparison
-- Calcula en tiempo real el costo total de la canasta por cada uno de los 6 supermercados
-- basándose en la lista guardada para una sesión o usuario.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.calculate_basket_comparison(
    p_session_id VARCHAR DEFAULT NULL,
    p_user_id UUID DEFAULT NULL
)
RETURNS TABLE (
    supermarket_id UUID,
    supermarket_name VARCHAR,
    supermarket_slug VARCHAR,
    logo_url TEXT,
    tier VARCHAR,
    total_market_cost NUMERIC,
    matched_products_count BIGINT,
    total_requested_products BIGINT,
    has_full_availability BOOLEAN,
    savings_vs_highest NUMERIC,
    savings_percentage NUMERIC
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_total_items BIGINT;
    v_highest_cost NUMERIC;
BEGIN
    -- Contar cuántos productos distintos se solicitaron
    SELECT COUNT(DISTINCT ul.product_id)
    INTO v_total_items
    FROM public.user_lists ul
    WHERE (p_session_id IS NOT NULL AND ul.session_id = p_session_id)
       OR (p_user_id IS NOT NULL AND ul.user_id = p_user_id);

    IF v_total_items = 0 OR v_total_items IS NULL THEN
        RETURN;
    END IF;

    -- Crear tabla temporal con los cálculos base por tienda
    CREATE TEMP TABLE temp_store_totals ON COMMIT DROP AS
    SELECT
        s.id AS sm_id,
        s.name AS sm_name,
        s.slug AS sm_slug,
        s.logo_url AS sm_logo,
        s.tier AS sm_tier,
        SUM(sp.price * ul.quantity) AS sm_total,
        COUNT(sp.product_id) AS sm_matched
    FROM public.user_lists ul
    JOIN public.supermarkets s ON TRUE
    LEFT JOIN public.supermarket_prices sp 
           ON sp.product_id = ul.product_id 
          AND sp.supermarket_id = s.id
    WHERE (p_session_id IS NOT NULL AND ul.session_id = p_session_id)
       OR (p_user_id IS NOT NULL AND ul.user_id = p_user_id)
    GROUP BY s.id, s.name, s.slug, s.logo_url, s.tier;

    -- Obtener el precio más caro (supermercado más costoso) para calcular el delta de ahorro
    SELECT MAX(sm_total) INTO v_highest_cost
    FROM temp_store_totals
    WHERE sm_matched = v_total_items;

    IF v_highest_cost IS NULL THEN
        SELECT MAX(sm_total) INTO v_highest_cost FROM temp_store_totals;
    END IF;

    -- Retornar tabla ordenada por menor costo (Podio: 1er lugar = Más económico)
    RETURN QUERY
    SELECT
        t.sm_id,
        t.sm_name,
        t.sm_slug,
        t.sm_logo,
        t.sm_tier,
        COALESCE(t.sm_total, 0)::NUMERIC AS total_market_cost,
        t.sm_matched AS matched_products_count,
        v_total_items AS total_requested_products,
        (t.sm_matched = v_total_items) AS has_full_availability,
        GREATEST(0, (COALESCE(v_highest_cost, t.sm_total) - t.sm_total))::NUMERIC AS savings_vs_highest,
        CASE 
            WHEN v_highest_cost > 0 THEN 
                ROUND(((v_highest_cost - t.sm_total) / v_highest_cost) * 100, 2)
            ELSE 0 
        END AS savings_percentage
    FROM temp_store_totals t
    ORDER BY total_market_cost ASC;
END;
$$;


-- ------------------------------------------------------------------------------
-- 2. FUNCIÓN: calculate_basket_from_items
-- Recibe un JSON directo de ítems: [{"product_id": "...", "quantity": 2}]
-- Permite cálculo instantáneo en memoria sin requerir persistencia en base de datos.
-- Ideal para UI responsiva y Next.js Server Actions.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.calculate_basket_from_items(
    p_items JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result JSONB;
BEGIN
    WITH input_items AS (
        SELECT 
            (item->>'product_id')::UUID AS product_id,
            COALESCE((item->>'quantity')::NUMERIC, 1.0) AS quantity
        FROM jsonb_array_elements(p_items) AS item
    ),
    totals AS (
        SELECT
            s.id AS supermarket_id,
            s.name AS supermarket_name,
            s.slug AS supermarket_slug,
            s.logo_url,
            s.tier,
            COALESCE(SUM(sp.price * ii.quantity), 0) AS total_market_cost,
            COUNT(sp.product_id) AS matched_count,
            (SELECT COUNT(*) FROM input_items) AS requested_count
        FROM input_items ii
        CROSS JOIN public.supermarkets s
        LEFT JOIN public.supermarket_prices sp 
               ON sp.product_id = ii.product_id 
              AND sp.supermarket_id = s.id
        GROUP BY s.id, s.name, s.slug, s.logo_url, s.tier
    ),
    benchmark AS (
        SELECT MAX(total_market_cost) AS max_cost
        FROM totals
        WHERE matched_count = requested_count
    )
    SELECT jsonb_agg(
        jsonb_build_object(
            'supermarket_id', t.supermarket_id,
            'supermarket_name', t.supermarket_name,
            'supermarket_slug', t.supermarket_slug,
            'logo_url', t.logo_url,
            'tier', t.tier,
            'total_market_cost', t.total_market_cost,
            'matched_count', t.matched_count,
            'requested_count', t.requested_count,
            'savings_vs_highest', GREATEST(0, (COALESCE(b.max_cost, t.total_market_cost) - t.total_market_cost)),
            'savings_percentage', CASE 
                WHEN COALESCE(b.max_cost, 0) > 0 THEN 
                    ROUND(((b.max_cost - t.total_market_cost) / b.max_cost) * 100, 1)
                ELSE 0 
            END
        ) ORDER BY t.total_market_cost ASC
    ) INTO v_result
    FROM totals t
    CROSS JOIN benchmark b;

    RETURN v_result;
END;
$$;


-- ------------------------------------------------------------------------------
-- 3. FUNCIÓN: calculate_hybrid_smart_basket
-- Determina el supermercado ganador por cada producto individual para armar
-- la "Canasta Híbrida Óptima" y compara el ahorro neto contra el costo de transporte.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.calculate_hybrid_smart_basket(
    p_items JSONB,
    p_transport_cost_cop NUMERIC DEFAULT 10000.00
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_hybrid_total NUMERIC := 0;
    v_cheapest_single_store_total NUMERIC := 0;
    v_store_count INT;
    v_result JSONB;
BEGIN
    WITH input_items AS (
        SELECT 
            (item->>'product_id')::UUID AS product_id,
            COALESCE((item->>'quantity')::NUMERIC, 1.0) AS quantity
        FROM jsonb_array_elements(p_items) AS item
    ),
    product_best_prices AS (
        SELECT DISTINCT ON (ii.product_id)
            ii.product_id,
            p.name AS product_name,
            p.unit_of_measure,
            ii.quantity,
            sp.price AS unit_price,
            (sp.price * ii.quantity) AS item_total,
            s.id AS best_supermarket_id,
            s.name AS best_supermarket_name,
            s.slug AS best_supermarket_slug
        FROM input_items ii
        JOIN public.products p ON p.id = ii.product_id
        JOIN public.supermarket_prices sp ON sp.product_id = ii.product_id
        JOIN public.supermarkets s ON s.id = sp.supermarket_id
        ORDER BY ii.product_id, sp.price ASC
    )
    SELECT 
        COALESCE(SUM(item_total), 0),
        COUNT(DISTINCT best_supermarket_id)
    INTO v_hybrid_total, v_store_count
    FROM product_best_prices;

    -- Obtener la tienda única más barata
    SELECT total_market_cost
    INTO v_cheapest_single_store_total
    FROM (
        SELECT SUM(sp.price * ii.quantity) AS total_market_cost
        FROM input_items ii
        JOIN public.supermarket_prices sp ON sp.product_id = ii.product_id
        GROUP BY sp.supermarket_id
        ORDER BY total_market_cost ASC
        LIMIT 1
    ) sub;

    RETURN jsonb_build_object(
        'hybrid_total_cop', v_hybrid_total,
        'cheapest_single_store_cop', v_cheapest_single_store_total,
        'gross_savings_cop', GREATEST(0, v_cheapest_single_store_total - v_hybrid_total),
        'number_of_stores_involved', v_store_count,
        'estimated_extra_transport_cost_cop', (GREATEST(0, v_store_count - 1) * p_transport_cost_cop),
        'net_savings_cop', (GREATEST(0, v_cheapest_single_store_total - v_hybrid_total) - (GREATEST(0, v_store_count - 1) * p_transport_cost_cop)),
        'is_hybrid_worth_it', (
            (GREATEST(0, v_cheapest_single_store_total - v_hybrid_total) - (GREATEST(0, v_store_count - 1) * p_transport_cost_cop)) > 0
        )
    );
END;
$$;
