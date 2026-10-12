export type SupermarketTier = 'hard_discount' | 'regional' | 'hypermarket' | 'premium';

export interface Supermarket {
  id: string;
  name: string;
  slug: 'd1' | 'ara' | 'mercaldas' | 'centro' | 'exito' | 'carulla';
  logo_url: string;
  tier: SupermarketTier;
  website_url?: string;
  city: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  display_order: number;
}

export interface ProductEquivalence {
  supermarket_id: string;
  supermarket_slug: string;
  store_product_name: string;
  store_brand: string;
  match_confidence: number;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  unit_of_measure: string;
  standard_quantity: number;
  barcode?: string;
  image_url: string;
  is_essential: boolean;
  equivalences?: Record<string, ProductEquivalence>;
}

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface SupermarketComparisonResult {
  supermarket: Supermarket;
  total_market_cost: number;
  matched_count: number;
  requested_count: number;
  has_full_availability: boolean;
  savings_vs_highest: number;
  savings_percentage: number;
  rank: number;
}

export interface ProductPriceBreakdown {
  product_id: string;
  product_name: string;
  unit_of_measure: string;
  quantity: number;
  prices: Record<string, {
    price: number;
    total: number;
    is_cheapest: boolean;
    brand_name?: string;
  }>;
}

export interface HybridBasketSuggestion {
  hybrid_total_cop: number;
  cheapest_single_store_cop: number;
  gross_savings_cop: number;
  number_of_stores_involved: number;
  estimated_extra_transport_cost_cop: number;
  net_savings_cop: number;
  is_hybrid_worth_it: boolean;
  store_breakdown: Record<string, {
    store_name: string;
    items_count: number;
    subtotal_cop: number;
    items: Array<{
      product_name: string;
      quantity: number;
      price: number;
    }>;
  }>;
}

export interface PriceDropAlert {
  id: string;
  product_id: string;
  product_name: string;
  supermarket_name: string;
  supermarket_slug: string;
  previous_price: number;
  current_price: number;
  drop_percentage: number;
  savings_cop: number;
  date_detected: string;
  unit_of_measure: string;
  image_url: string;
}

export interface PresetBasket {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  estimated_price_cop: number;
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
}
