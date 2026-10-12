import { 
  BasketItem, 
  SupermarketComparisonResult, 
  ProductPriceBreakdown, 
  HybridBasketSuggestion 
} from '@/types';
import { SUPERMARKETS, PRODUCT_PRICES_MATRIX } from './mockData';

export function calculateSupermarketPodium(basket: BasketItem[]): SupermarketComparisonResult[] {
  if (basket.length === 0) return [];

  const results: SupermarketComparisonResult[] = SUPERMARKETS.map((sm) => {
    let total = 0;
    let matchedCount = 0;

    basket.forEach((item) => {
      const pricesForProd = PRODUCT_PRICES_MATRIX[item.product.id];
      if (pricesForProd && pricesForProd[sm.slug] !== undefined) {
        total += pricesForProd[sm.slug] * item.quantity;
        matchedCount += 1;
      }
    });

    return {
      supermarket: sm,
      total_market_cost: total,
      matched_count: matchedCount,
      requested_count: basket.length,
      has_full_availability: matchedCount === basket.length,
      savings_vs_highest: 0,
      savings_percentage: 0,
      rank: 1,
    };
  });

  // Ordenar por costo total ascendente (1er lugar = Más económico)
  results.sort((a, b) => a.total_market_cost - b.total_market_cost);

  // Supermercado más costoso de referencia
  const highestCost = results[results.length - 1]?.total_market_cost || 0;

  return results.map((item, index) => {
    const diff = Math.max(0, highestCost - item.total_market_cost);
    const pct = highestCost > 0 ? Number(((diff / highestCost) * 100).toFixed(1)) : 0;
    return {
      ...item,
      rank: index + 1,
      savings_vs_highest: diff,
      savings_percentage: pct,
    };
  });
}

export function calculateProductBreakdown(basket: BasketItem[]): ProductPriceBreakdown[] {
  return basket.map((item) => {
    const pricesForProd = PRODUCT_PRICES_MATRIX[item.product.id] || {};
    
    // Encontrar el precio mínimo para este producto
    let minPrice = Infinity;
    Object.values(pricesForProd).forEach((price) => {
      if (price < minPrice) minPrice = price;
    });

    const storeBreakdown: ProductPriceBreakdown['prices'] = {};

    SUPERMARKETS.forEach((sm) => {
      const unitPrice = pricesForProd[sm.slug] || 0;
      const eq = item.product.equivalences ? item.product.equivalences[sm.slug] : undefined;
      storeBreakdown[sm.slug] = {
        price: unitPrice,
        total: unitPrice * item.quantity,
        is_cheapest: unitPrice === minPrice,
        brand_name: eq?.store_brand,
      };
    });

    return {
      product_id: item.product.id,
      product_name: item.product.name,
      unit_of_measure: item.product.unit_of_measure,
      quantity: item.quantity,
      prices: storeBreakdown,
    };
  });
}

export function calculateHybridBasket(
  basket: BasketItem[], 
  transportCostCop: number = 8500
): HybridBasketSuggestion {
  if (basket.length === 0) {
    return {
      hybrid_total_cop: 0,
      cheapest_single_store_cop: 0,
      gross_savings_cop: 0,
      number_of_stores_involved: 0,
      estimated_extra_transport_cost_cop: 0,
      net_savings_cop: 0,
      is_hybrid_worth_it: false,
      store_breakdown: {},
    };
  }

  const breakdown: HybridBasketSuggestion['store_breakdown'] = {};
  let hybridTotal = 0;

  basket.forEach((item) => {
    const pricesForProd = PRODUCT_PRICES_MATRIX[item.product.id] || {};
    let bestStoreSlug = 'd1';
    let bestPrice = Infinity;

    Object.entries(pricesForProd).forEach(([slug, price]) => {
      if (price < bestPrice) {
        bestPrice = price;
        bestStoreSlug = slug;
      }
    });

    const storeObj = SUPERMARKETS.find((s) => s.slug === bestStoreSlug) || SUPERMARKETS[0];
    const subtotal = bestPrice * item.quantity;
    hybridTotal += subtotal;

    if (!breakdown[bestStoreSlug]) {
      breakdown[bestStoreSlug] = {
        store_name: storeObj.name,
        items_count: 0,
        subtotal_cop: 0,
        items: [],
      };
    }

    breakdown[bestStoreSlug].items_count += 1;
    breakdown[bestStoreSlug].subtotal_cop += subtotal;
    breakdown[bestStoreSlug].items.push({
      product_name: item.product.name,
      quantity: item.quantity,
      price: bestPrice,
    });
  });

  const podium = calculateSupermarketPodium(basket);
  const cheapestSingleStore = podium[0]?.total_market_cost || 0;
  const storeCount = Object.keys(breakdown).length;
  const extraTrips = Math.max(0, storeCount - 1);
  const totalTransport = extraTrips * transportCostCop;
  const grossSavings = Math.max(0, cheapestSingleStore - hybridTotal);
  const netSavings = grossSavings - totalTransport;

  return {
    hybrid_total_cop: hybridTotal,
    cheapest_single_store_cop: cheapestSingleStore,
    gross_savings_cop: grossSavings,
    number_of_stores_involved: storeCount,
    estimated_extra_transport_cost_cop: totalTransport,
    net_savings_cop: netSavings,
    is_hybrid_worth_it: netSavings > 0,
    store_breakdown: breakdown,
  };
}

export function formatCOP(val: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(val);
}

export interface StoreBudgetAnalysis {
  supermarket: typeof SUPERMARKETS[0];
  total_cost: number;
  fits_in_budget: boolean;
  difference_cop: number; // Positivo si sobra dinero, negativo si falta
  remaining_cop: number;
  coverage_percentage: number; // % del total de productos que alcanza a comprar
  purchasable_items_count: number;
  total_items_count: number;
  recommendation_badge: string;
}

export interface BudgetOptimizationResult {
  budget_amount: number;
  cheapest_store: typeof SUPERMARKETS[0];
  recommended_store: typeof SUPERMARKETS[0];
  stores_analysis: StoreBudgetAnalysis[];
  optimal_basket_items: BasketItem[]; // Si la canasta supera el presupuesto, sugiere los prioritarios
  total_essential_cost: number;
  surplus_or_deficit: number;
  status: 'surplus' | 'exact' | 'deficit';
}

/**
 * Motor de optimización financiera por presupuesto:
 * Compara tu lista en cada supermercado contra tu monto disponible y te dice
 * exactamente dónde te alcanza o cuál te deja el mayor dinero sobrante.
 */
export function calculateBudgetOptimization(
  basket: BasketItem[],
  budget: number
): BudgetOptimizationResult {
  const podium = calculateSupermarketPodium(basket);
  const cheapestResult = podium[0];
  const totalItemsCount = basket.reduce((acc, it) => acc + it.quantity, 0);

  const storesAnalysis: StoreBudgetAnalysis[] = SUPERMARKETS.map((store) => {
    const storePodium = podium.find((p) => p.supermarket.slug === store.slug);
    const totalCost = storePodium ? storePodium.total_market_cost : 0;
    const fits = totalCost <= budget;
    const difference = budget - totalCost;
    const remaining = Math.max(0, difference);

    // Calcular cuántos productos alcanza a comprar con ese presupuesto en esa tienda
    let runningCost = 0;
    let purchasableCount = 0;

    // Priorizar productos esenciales
    const sortedItems = [...basket].sort((a, b) => {
      if (a.product.is_essential && !b.product.is_essential) return -1;
      if (!a.product.is_essential && b.product.is_essential) return 1;
      return 0;
    });

    sortedItems.forEach((it) => {
      const unitP = PRODUCT_PRICES_MATRIX[it.product.id]?.[store.slug] || 0;
      const itemCost = unitP * it.quantity;
      if (runningCost + itemCost <= budget) {
        runningCost += itemCost;
        purchasableCount += it.quantity;
      }
    });

    const coverage = totalItemsCount > 0 ? Math.min(100, Math.round((purchasableCount / totalItemsCount) * 100)) : 100;

    let badge = 'No alcanza';
    if (fits) {
      if (store.slug === cheapestResult?.supermarket.slug) {
        badge = '¡Recomendado! Mayor Ahorro';
      } else {
        badge = 'Alcanza completo';
      }
    } else if (coverage >= 80) {
      badge = 'Casi completo';
    }

    return {
      supermarket: store,
      total_cost: totalCost,
      fits_in_budget: fits,
      difference_cop: difference,
      remaining_cop: remaining,
      coverage_percentage: coverage,
      purchasable_items_count: purchasableCount,
      total_items_count: totalItemsCount,
      recommendation_badge: badge,
    };
  });

  // Tienda recomendada: la que quepa en el presupuesto y sea la más económica
  const fittingStores = storesAnalysis.filter((s) => s.fits_in_budget);
  const recommendedStore = fittingStores.length > 0 
    ? fittingStores.sort((a, b) => a.total_cost - b.total_cost)[0].supermarket
    : (cheapestResult?.supermarket || SUPERMARKETS[0]);

  const bestTotalCost = cheapestResult?.total_market_cost || 0;
  const surplusOrDeficit = budget - bestTotalCost;

  return {
    budget_amount: budget,
    cheapest_store: cheapestResult?.supermarket || SUPERMARKETS[0],
    recommended_store: recommendedStore,
    stores_analysis: storesAnalysis.sort((a, b) => a.total_cost - b.total_cost),
    optimal_basket_items: basket,
    total_essential_cost: bestTotalCost,
    surplus_or_deficit: surplusOrDeficit,
    status: surplusOrDeficit > 0 ? 'surplus' : surplusOrDeficit === 0 ? 'exact' : 'deficit',
  };
}
