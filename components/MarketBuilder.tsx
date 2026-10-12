'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  Sparkles, 
  X,
  DollarSign,
  HelpCircle,
  Check
} from 'lucide-react';
import { Product, BasketItem, PresetBasket } from '@/types';
import { PRODUCTS, CATEGORIES, PRESET_BASKETS } from '@/lib/mockData';
import { formatCOP } from '@/lib/calculator';

interface MarketBuilderProps {
  basket: BasketItem[];
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (productId: string) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearBasket: () => void;
  activeTab: 'exact' | 'budget';
  onTabChange: (tab: 'exact' | 'budget') => void;
  budgetAmount: number;
  onBudgetChange: (amount: number) => void;
  onCalculate: () => void;
  onLoadPreset: (preset: PresetBasket) => void;
}

export const MarketBuilder: React.FC<MarketBuilderProps> = ({
  basket,
  onAddProduct,
  onRemoveProduct,
  onUpdateQuantity,
  onClearBasket,
  activeTab,
  onTabChange,
  budgetAmount,
  onBudgetChange,
  onCalculate,
  onLoadPreset,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudgetInput, setTempBudgetInput] = useState(budgetAmount.toString());

  const totalArticles = basket.reduce((acc, item) => acc + item.quantity, 0);

  // Filtrado reactivo de productos para el buscador
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesQuery = !searchQuery.trim() || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = !selectedCategory || p.category_id === selectedCategory;
      return matchesQuery && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleSaveBudget = () => {
    const val = Number(tempBudgetInput.replace(/\D/g, ''));
    if (val > 0) {
      onBudgetChange(val);
    }
    setIsEditingBudget(false);
  };

  // Obtener emoji o ícono para la categoría
  const getCategoryIcon = (categoryId: string) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    return cat ? cat.icon : '🛒';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-28 animate-fade-in">
      
      {/* Selector de Modo (Lista Exacta vs Modo Presupuesto) */}
      <div className="flex items-center justify-between">
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
          <button
            onClick={() => onTabChange('exact')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'exact'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            📋 Lista Exacta
          </button>
          <button
            onClick={() => onTabChange('budget')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'budget'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>💰 Modo Presupuesto</span>
          </button>
        </div>

        {/* Canastas Rápidas Desplegables */}
        <div className="relative group">
          <button className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
            <span>⚡ Canastas sugeridas</span>
          </button>
          <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 hidden group-hover:block z-30 animate-fade-in">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 block">
              Cargar canasta básica
            </span>
            {PRESET_BASKETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onLoadPreset(preset)}
                className="w-full text-left p-2 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span>{preset.icon}</span>
                    <span>{preset.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">~{formatCOP(preset.estimated_price_cop)}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Cargar
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Encabezado Principal Exacto del Mock */}
      <div className="flex items-start justify-between gap-4 pt-1">
        <div>
          <span className="text-xs font-extrabold text-emerald-700 tracking-wider uppercase block">
            {activeTab === 'budget' ? 'MODO PRESUPUESTO' : 'LISTA EXACTA'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Arma tu mercado
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Agrega todo lo que necesitas. Nosotros comparamos.
          </p>
        </div>

        {/* Contador de Productos */}
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-extrabold text-xs px-3.5 py-1.5 rounded-full shrink-0 shadow-xs">
          {basket.length} {basket.length === 1 ? 'producto' : 'productos'}
        </div>
      </div>

      {/* Tarjeta de Presupuesto Máximo (en Modo Presupuesto) */}
      {activeTab === 'budget' && (
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs transition-all">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-400/90 flex items-center justify-center text-slate-950 shadow-xs shrink-0">
              <ShoppingBag className="w-5 h-5 text-amber-950" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                MI PRESUPUESTO MÁXIMO
              </span>
              {isEditingBudget ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    value={tempBudgetInput}
                    onChange={(e) => setTempBudgetInput(e.target.value)}
                    className="w-32 px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-sm font-black text-slate-900 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveBudget}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-lg"
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setIsEditingBudget(true)}
                  className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight cursor-pointer hover:text-amber-800 transition-colors"
                  title="Haz clic para modificar presupuesto"
                >
                  {formatCOP(budgetAmount)}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsEditingBudget(!isEditingBudget)}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-200/70 px-3 py-1.5 rounded-xl transition-colors"
          >
            {isEditingBudget ? 'Cancelar' : 'Cambiar'}
          </button>
        </div>
      )}

      {/* Buscador de Productos Ultra Limpio */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar producto (ej. Arroz, Leche, Huevos, Aceite)"
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Desplegable de Resultados de Búsqueda Instantánea */}
        {searchQuery.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 max-h-72 overflow-y-auto z-30 p-2 divide-y divide-slate-100 animate-fade-in">
            {filteredProducts.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                No encontramos productos con &quot;{searchQuery}&quot;. Prueba con Arroz, Leche, Frijol, etc.
              </div>
            ) : (
              filteredProducts.map((prod) => {
                const inBasket = basket.find((item) => item.product.id === prod.id);
                return (
                  <div
                    key={prod.id}
                    className="p-2.5 flex items-center justify-between hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{getCategoryIcon(prod.category_id)}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{prod.name}</div>
                        <span className="text-[10px] text-slate-400">{prod.unit_of_measure}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onAddProduct(prod);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-transform active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{inBasket ? `Agregar (+${inBasket.quantity})` : 'Agregar'}</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Sección "En tu lista" */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-extrabold text-slate-800 tracking-tight">
            En tu lista
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {totalArticles} {totalArticles === 1 ? 'artículo en total' : 'artículos en total'}
          </span>
        </div>

        {/* Listado de Productos Agregados */}
        {basket.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">Tu lista está vacía</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-0.5">
                Busca productos arriba o carga una canasta sugerida para ver los mejores precios.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {basket.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs p-3.5 sm:p-4 flex items-center justify-between hover:border-slate-200/90 transition-all"
              >
                
                {/* Lado Izquierdo: Ícono y Datos del Producto */}
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50/80 border border-amber-100/60 flex items-center justify-center text-lg shrink-0">
                    {getCategoryIcon(product.category_id)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {product.unit_of_measure}
                    </p>
                  </div>
                </div>

                {/* Lado Derecho: Selector de Cantidad y Botón Eliminar */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-2">
                    <button
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 shadow-2xs font-bold text-xs"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-black text-slate-900 min-w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white hover:bg-emerald-700 shadow-2xs font-bold text-xs"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nota Explicativa Amigable de Procedencia */}
      <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/60 flex items-center gap-2.5 text-xs text-slate-500">
        <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          <strong>¿De dónde son los productos?</strong> Tu lista contiene los alimentos que consumes en casa. Al calcular, comparamos automáticamente el producto exacto y su marca equivalente en <strong>D1, Ara, Mercaldas, Centro, Éxito y Carulla</strong>.
        </span>
      </div>

      {/* Barra Flotante / Sticky Inferior Exacta del Mock */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-3 sm:p-4 z-40 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-500">
            Total artículos: <span className="font-extrabold text-slate-900">{totalArticles}</span>
          </div>

          <button
            onClick={onCalculate}
            disabled={basket.length === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 ${
              basket.length > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Calcular mi ahorro total</span>
            <span>&gt;</span>
          </button>
        </div>
      </div>

    </div>
  );
};
