-- ==============================================================================
-- YO MERCO (COLOMBIA) - ESQUEMA DE BASE DE DATOS POSTGRESQL / SUPABASE
-- Plataforma Optimizadora de Presupuesto y Comparador Multicanal
-- Enfoque: Manizales y Expansión Nacional
-- ==============================================================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. TABLA: supermarkets
-- Cadenas de supermercados integradas (D1, Ara, Mercaldas, Centro, Éxito, Carulla)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.supermarkets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    logo_url TEXT,
    tier VARCHAR(50) NOT NULL CHECK (tier IN ('hard_discount', 'regional', 'hypermarket', 'premium')),
    website_url TEXT,
    city VARCHAR(50) DEFAULT 'Manizales',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 2. TABLA: categories
-- Categorías de la canasta familiar colombiana
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50), -- Nombre de icono o emoji representativo
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. TABLA: products
-- Catálogo maestro de productos normalizados
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    unit_of_measure VARCHAR(50) NOT NULL, -- '1000g', 'litro', 'unidad', 'paquete', '500g'
    standard_quantity NUMERIC(10, 2) DEFAULT 1.0, -- Cantidad base para comparativa de peso
    barcode VARCHAR(50), -- Código EAN para escaneo de código de barras
    image_url TEXT,
    is_essential BOOLEAN DEFAULT TRUE, -- Indicador de canasta básica de alta rotación
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. TABLA: product_equivalences (VARIANTE DE VALOR: Motor de Normalización)
-- Mapea las marcas blancas (D1/Ara) con marcas líderes tradicionales (Éxito/Carulla)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_equivalences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    master_product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    supermarket_id UUID NOT NULL REFERENCES public.supermarkets(id) ON DELETE CASCADE,
    store_product_name VARCHAR(255) NOT NULL, -- Nombre real en góndola (ej: "Leche Latti Entera 900ml")
    store_brand VARCHAR(100) NOT NULL,        -- Marca (ej: "Latti", "De La Cuesta", "Alquería")
    store_sku VARCHAR(100),
    match_confidence NUMERIC(3, 2) DEFAULT 1.00, -- Nivel de equivalencia cualitativa (0.0 a 1.0)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (master_product_id, supermarket_id)
);

-- ------------------------------------------------------------------------------
-- 5. TABLA: supermarket_prices
-- Histórico y precios vigentes por establecimiento
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.supermarket_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    supermarket_id UUID NOT NULL REFERENCES public.supermarkets(id) ON DELETE CASCADE,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0), -- Precio en COP
    original_price NUMERIC(12, 2), -- Precio antes de promoción (si aplica)
    is_promo BOOLEAN DEFAULT FALSE,
    promo_description VARCHAR(255),
    stock_status VARCHAR(20) DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'limited')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (product_id, supermarket_id)
);

-- ------------------------------------------------------------------------------
-- 6. TABLA: user_lists
-- Gestión de canastas guardadas por usuarios o sesiones anónimas
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(100), -- Para invitados anónimos / localStorage sync
    user_id UUID,            -- Para usuarios autenticados de Supabase Auth
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity NUMERIC(6, 2) NOT NULL DEFAULT 1.0 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- ÍNDICES DE RENDIMIENTO (Performance Optimization)
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_prices_lookup ON public.supermarket_prices(product_id, supermarket_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_user_lists_session ON public.user_lists(session_id);
CREATE INDEX IF NOT EXISTS idx_user_lists_user ON public.user_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_equivalences_master ON public.product_equivalences(master_product_id);

-- ------------------------------------------------------------------------------
-- SEGURIDAD A NIVEL DE FILAS (Row Level Security - RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.supermarkets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_equivalences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supermarket_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lists ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública para catálogos y precios (Lectura de acceso ultra-rápido)
CREATE POLICY "Acceso público de lectura a supermercados" ON public.supermarkets FOR SELECT USING (true);
CREATE POLICY "Acceso público de lectura a categorías" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Acceso público de lectura a productos" ON public.products FOR SELECT USING (true);
CREATE POLICY "Acceso público de lectura a equivalencias" ON public.product_equivalences FOR SELECT USING (true);
CREATE POLICY "Acceso público de lectura a precios" ON public.supermarket_prices FOR SELECT USING (true);

-- Política para listas de usuario: acceso por session_id o user_id autenticado
CREATE POLICY "Usuarios pueden gestionar sus listas por sesión o ID" ON public.user_lists
    FOR ALL
    USING (
        (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
        (session_id IS NOT NULL)
    );
