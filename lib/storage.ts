import { BasketItem } from '@/types';

const BASKET_STORAGE_KEY = 'yomerco_basket_items_v1';
const CITY_STORAGE_KEY = 'yomerco_selected_city_v1';
const BUDGET_STORAGE_KEY = 'yomerco_budget_cop_v1';

export function getStoredBasket(): BasketItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BASKET_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading basket from storage', e);
    return [];
  }
}

export function saveStoredBasket(basket: BasketItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
  } catch (e) {
    console.error('Error saving basket to storage', e);
  }
}

export function getStoredCity(): string {
  if (typeof window === 'undefined') return 'Manizales';
  return localStorage.getItem(CITY_STORAGE_KEY) || 'Manizales';
}

export function saveStoredCity(city: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CITY_STORAGE_KEY, city);
}

export function getStoredBudget(): number {
  if (typeof window === 'undefined') return 200000;
  const raw = localStorage.getItem(BUDGET_STORAGE_KEY);
  return raw ? Number(raw) : 200000;
}

export function saveStoredBudget(amount: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BUDGET_STORAGE_KEY, String(amount));
}
