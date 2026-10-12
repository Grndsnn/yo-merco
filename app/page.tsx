'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  DollarSign, 
  Check, 
  RefreshCw,
  Plus
} from 'lucide-react';
import { Product, BasketItem, PresetBasket } from '@/types';
import { PRODUCTS, SUPERMARKETS } from '@/lib/mockData';
import { 
  calculateSupermarketPodium, 
  calculateProductBreakdown, 
  calculateHybridBasket, 
  calculateBudgetOptimization,
  formatCOP 
} from '@/lib/calculator';
import { 
  getStoredBasket, 
  saveStoredBasket, 
  getStoredBudget, 
  saveStoredBudget 
} from '@/lib/storage';
import { Navbar } from '@/components/Navbar';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SavingsPodium } from '@/components/SavingsPodium';
import { BudgetRecommendationCard } from '@/components/BudgetRecommendationCard';
import { ProductBreakdownAccordion } from '@/components/ProductBreakdownAccordion';
import { HybridBasketCard } from '@/components/HybridBasketCard';
import { EquivalencesModal } from '@/components/EquivalencesModal';
import { BasketDrawer } from '@/components/BasketDrawer';
import { PresetBaskets } from '@/components/PresetBaskets';
import { PriceDropAlerts } from '@/components/PriceDropAlerts';

export default function HomePage() {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [activeTab, setActiveTab] = useState<'exact' | 'budget'>('exact');
  const [budgetAmount, setBudgetAmount] = useState<number>(200000);
  const [isBasketDrawerOpen, setIsBasketDrawerOpen] = useState(false);
  const [selectedEquivalenceProduct, setSelectedEquivalenceProduct] = useState<Product | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  // Cargar estado inicial desde LocalStorage
  useEffect(() => {
    const savedBasket = getStoredBasket();
    if (savedBasket && savedBasket.length > 0) {
      setBasket(savedBasket);
    } else {
      // Iniciar con 4 productos básicos para demostración inmediata
      const initialItems: BasketItem[] = [
        { product: PRODUCTS[0], quantity: 2 }, // Arroz Blanco
        { product: PRODUCTS[1], quantity: 1 }, // Aceite Vegetal
        { product: PRODUCTS[10], quantity: 3 }, // Leche Entera
        { product: PRODUCTS[11], quantity: 1 }, // Huevos AA x30
      ];
      setBasket(initialItems);
      saveStoredBasket(initialItems);
    }
    const savedBudget = getStoredBudget();
    if (savedBudget) {
      setBudgetAmount(savedBudget);
    }
  }, []);

  const updateBasket = (newBasket: BasketItem[]) => {
    setBasket(newBasket);
    saveStoredBasket(newBasket);
  };

  const handleAddProduct = (product: Product) => {
    const existingIndex = basket.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...basket];
      updated[existingIndex].quantity += 1;
      updateBasket(updated);
    } else {
      updateBasket([...basket, { product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    const existingIndex = basket.findIndex((item) => item.product.id === productId);
    if (existingIndex > -1) {
      const current = basket[existingIndex];
      if (current.quantity > 1) {
        const updated = [...basket];
        updated[existingIndex].quantity -= 1;
        updateBasket(updated);
      } else {
        const updated = basket.filter((item) => item.product.id !== productId);
        updateBasket(updated);
      }
    }
  };

  const handleClearBasket = () => {
    updateBasket([]);
    setActivePresetId(null);
  };

  const handleBudgetChange = (amount: number) => {
    setBudgetAmount(amount);
    saveStoredBudget(amount);
  };

  // Cargar Canasta Predeterminada
  const handleLoadPreset = (preset: PresetBasket) => {
    const newBasketItems: BasketItem[] = [];

    preset.items.forEach((item) => {
      const productObj = PRODUCTS.find((p) => p.id === item.product_id);
      if (productObj) {
        newBasketItems.push({
          product: productObj,
          quantity: item.quantity,
        });
      }
    });

    setActivePresetId(preset.id);
    updateBasket(newBasketItems);

    // Desplazar suavemente a los resultados
    const resEl = document.getElementById('results-section');
    if (resEl) {
      resEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cálculos reactivos
  const podiumResults = useMemo(() => {
    return calculateSupermarketPodium(basket);
  }, [basket]);

  const productBreakdowns = useMemo(() => {
    return calculateProductBreakdown(basket);
  }, [basket]);

  const hybridSuggestion = useMemo(() => {
    return calculateHybridBasket(basket, 6000); // 6.000 COP tarifa promedio de 2 pasajes urbanos en Manizales
  }, [basket]);

  const budgetOptimization = useMemo(() => {
    return calculateBudgetOptimization(basket, budgetAmount);
  }, [basket, budgetAmount]);

  const totalItemsCount = basket.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900 antialiased selection:bg-brand-500 selection:text-white">
      
      {/* Barra de Navegación Visual */}
      <Navbar
        itemCount={totalItemsCount}
        onOpenBasket={() => setIsBasketDrawerOpen(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Hero / Encabezado Principal */}
      <section className="bg-gradient-to-b from-white via-brand-50/40 to-slate-50 border-b border-gray-200/60 py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-brand-800 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <Zap className="w-3.5 h-3.5 text-brand-600" />
            <span>Monitoreo Activo de Precios en Manizales y Colombia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
            No pagues de más en tu mercado.
          </h1>

          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Comparamos en tiempo real el precio de tu lista familiar entre{' '}
            <strong className="text-gray-900 font-extrabold">Tiendas D1</strong>,{' '}
            <strong className="text-gray-900 font-extrabold">Tiendas Ara</strong>,{' '}
            <strong className="text-gray-900 font-extrabold">Mercaldas</strong>,{' '}
            <strong className="text-gray-900 font-extrabold">Supermercado del Centro</strong>,{' '}
            <strong className="text-gray-900 font-extrabold">Éxito</strong> y{' '}
            <strong className="text-gray-900 font-extrabold">Carulla</strong>.
          </p>

          {/* Ajuste de Presupuesto cuando está activo el Modo Presupuesto */}
          {activeTab === 'budget' && (
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-brand-200 shadow-sm max-w-xl mx-auto mt-6 text-left space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-brand-600" />
                  Monto Máximo Disponible para Mercar (COP)
                </label>
                <span className="text-base font-extrabold text-brand-700">
                  {formatCOP(budgetAmount)}
                </span>
              </div>

              <input
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={budgetAmount}
                onChange={(e) => handleBudgetChange(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                <span>$50.000</span>
                <span>$200.000 (Quincena típica)</span>
                <span>$500.000</span>
                <span>$1.000.000</span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-12">
        
        {/* SECCIÓN 1: CANASTAS PREDETERMINADAS (Las 4 opciones recomendadas) */}
        <section className="animate-fade-in">
          <PresetBaskets 
            onLoadPreset={handleLoadPreset} 
            activePresetId={activePresetId}
          />
        </section>

        {/* SECCIÓN 2: RESULTADOS Y PODIO DE AHORRO (SI TIENE ARTÍCULOS) */}
        {basket.length > 0 && (
          <section id="results-section" className="space-y-8 animate-fade-in pt-4 border-t border-gray-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                  Resultados del Comparador
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Cálculo automático para tu selección de {totalItemsCount} productos
                </p>
              </div>

              <button
                onClick={() => setIsBasketDrawerOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-4 py-2.5 rounded-2xl transition-colors self-start sm:self-auto border border-brand-200/60 shadow-2xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Ver y ajustar mi canasta ({totalItemsCount} artículos)</span>
              </button>
            </div>

            {/* Modo Presupuesto Activo: Tarjeta de Recomendación de Tienda según Presupuesto */}
            {activeTab === 'budget' && (
              <BudgetRecommendationCard
                optimization={budgetOptimization}
                onScrollToBreakdown={() => {
                  const el = document.getElementById('breakdown-table-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            )}

            {/* Podio con Ara 2°, D1 1° Campeón Verde y Mercaldas 3° */}
            <SavingsPodium
              results={podiumResults}
              onScrollToBreakdown={() => {
                const el = document.getElementById('breakdown-table-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Canasta Híbrida Multitienda con Descuento de Pasajes */}
            <HybridBasketCard hybridData={hybridSuggestion} />

            {/* Desglose Detallado por Producto con Píldoras Verdes */}
            <div id="breakdown-table-section">
              <ProductBreakdownAccordion breakdowns={productBreakdowns} />
            </div>
          </section>
        )}

        {/* SECCIÓN 3: ALERTAS DE REBAJAS DE PRECIOS */}
        <section className="animate-fade-in pt-4 border-t border-gray-200/80">
          <PriceDropAlerts onAddProduct={handleAddProduct} />
        </section>

        {/* SECCIÓN 4: CATÁLOGO VISUAL DE PRODUCTOS (Filtros por categoría + fotos reales) */}
        <section className="space-y-4 pt-4 border-t border-gray-200/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                Catálogo de Productos Esenciales
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Selecciona por categoría para agregar a tu lista sin sobrecargar la pantalla
              </p>
            </div>
          </div>

          <ProductCatalog
            basket={basket}
            onAddProduct={handleAddProduct}
            onRemoveProduct={handleRemoveProduct}
            onOpenEquivalence={(prod) => setSelectedEquivalenceProduct(prod)}
          />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8 px-4 text-center text-xs text-gray-500 space-y-2">
        <p className="font-bold text-gray-800">
          Yo Merco Colombia © {new Date().getFullYear()} — Plataforma Optimizadora de Presupuesto
        </p>
        <p className="max-w-xl mx-auto text-[11px] text-gray-400">
          Diseñado para el mercado colombiano con foco inicial en Manizales (Caldas) y expansión nacional.
          Precios analizados de Tiendas D1, Tiendas Ara, Mercaldas, Supermercado del Centro, Éxito y Carulla.
        </p>
      </footer>

      {/* Modal de Mapeo de Marcas Equivalentes */}
      <EquivalencesModal
        product={selectedEquivalenceProduct}
        onClose={() => setSelectedEquivalenceProduct(null)}
      />

      {/* Drawer Lateral de Mi Canasta */}
      <BasketDrawer
        isOpen={isBasketDrawerOpen}
        onClose={() => setIsBasketDrawerOpen(false)}
        basket={basket}
        onAddProduct={handleAddProduct}
        onRemoveProduct={handleRemoveProduct}
        onClearBasket={handleClearBasket}
        onCalculate={() => {
          setIsBasketDrawerOpen(false);
          const el = document.getElementById('results-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Barra Flotante Móvil de Resumen */}
      {basket.length > 0 && !isBasketDrawerOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-30 sm:hidden">
          <button
            onClick={() => setIsBasketDrawerOpen(true)}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between font-bold text-sm transition-transform active:scale-98"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Mi Canasta ({totalItemsCount} ítems)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs bg-brand-700 px-3 py-1 rounded-xl">
              <span>{podiumResults[0] ? formatCOP(podiumResults[0].total_market_cost) : 'Calcular'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

    </div>
  );
}
