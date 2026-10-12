'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Check, Layers, Store, Sparkles } from 'lucide-react';
import { Product, Category, BasketItem } from '@/types';
import { CATEGORIES, PRODUCTS, PRODUCT_PRICES_MATRIX, SUPERMARKETS } from '@/lib/mockData';
import { formatCOP } from '@/lib/calculator';

interface ProductCatalogProps {
  basket: BasketItem[];
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (productId: string) => void;
  onOpenEquivalence: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  basket,
  onAddProduct,
  onRemoveProduct,
  onOpenEquivalence,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  // Por defecto iniciamos en la primera categoría para NO saturar la pantalla con 50 productos a la vez
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0]?.id || 'all');

  const basketMap = useMemo(() => {
    const map = new Map<string, number>();
    basket.forEach((item) => map.set(item.product.id, item.quantity));
    return map;
  }, [basket]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.unit_of_measure.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        searchQuery.trim().length > 0 || // Si está buscando, busca en todo el catálogo
        selectedCategory === 'all' || 
        product.category_id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Obtener el precio más bajo y la tienda que lo ofrece para cada producto
  const getCheapestInfo = (productId: string) => {
    const prices = PRODUCT_PRICES_MATRIX[productId] || {};
    let minPrice = Infinity;
    let storeName = 'D1';

    Object.entries(prices).forEach(([slug, price]) => {
      if (price < minPrice) {
        minPrice = price;
        const found = SUPERMARKETS.find((s) => s.slug === slug);
        if (found) storeName = found.name.replace('Tiendas ', '');
      }
    });

    return {
      price: minPrice === Infinity ? 0 : minPrice,
      store: storeName,
    };
  };

  return (
    <section className="space-y-6">
      
      {/* Buscador Rápido y Selector de Categorías */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-gray-200/80 space-y-4">
        
        {/* Barra de Búsqueda */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar producto por nombre (ej. Arroz, Leche, Huevos, Pechuga, Jabón)..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-700 bg-gray-200/80 px-2 py-0.5 rounded-lg"
            >
              Borrar
            </button>
          )}
        </div>

        {/* Pestañas de Categorías para Navegar Limpiamente */}
        <div>
          <div className="flex items-center justify-between pb-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Categorías de la canasta familiar (Selecciona para filtrar):
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`text-xs font-bold transition-colors ${
                selectedCategory === 'all' ? 'text-brand-700 underline' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Ver todos ({PRODUCTS.length})
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id && !searchQuery.trim();
              const countInCat = PRODUCTS.filter((p) => p.category_id === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSearchQuery('');
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-2xs ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm scale-102'
                      : 'bg-gray-100/90 text-gray-700 hover:bg-gray-200/80 hover:text-gray-900'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {countInCat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid Visual de Productos con Fotografías Reales y Procedencia */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {filteredProducts.map((product) => {
          const qty = basketMap.get(product.id) || 0;
          const cheapest = getCheapestInfo(product.id);
          const hasEquivalences = Boolean(product.equivalences);

          return (
            <div
              key={product.id}
              className={`bg-white rounded-3xl border transition-all flex flex-col justify-between overflow-hidden group hover:shadow-md ${
                qty > 0 
                  ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-xs' 
                  : 'border-gray-200/80 hover:border-gray-300'
              }`}
            >
              {/* Foto Real del Producto */}
              <div className="p-4 pb-2">
                <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-gray-50 mb-3 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Badge de cantidad agregada */}
                  {qty > 0 && (
                    <div className="absolute top-2.5 right-2.5 bg-brand-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> {qty} en tu lista
                    </div>
                  )}

                  {/* Botón de Marcas Equivalentes */}
                  {hasEquivalences && (
                    <button
                      onClick={() => onOpenEquivalence(product)}
                      title="Ver equivalencia entre marcas propias y comerciales"
                      className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-md text-gray-800 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm border border-gray-200/80 flex items-center gap-1 hover:bg-white"
                    >
                      <Layers className="w-3 h-3 text-brand-600" /> Ver marcas equivalentes
                    </button>
                  )}
                </div>

                {/* Título y Unidad */}
                <h3 className="font-extrabold text-gray-900 text-sm leading-snug line-clamp-2">
                  {product.name}
                </h3>
                <span className="inline-block mt-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  Presentación: {product.unit_of_measure}
                </span>

                {/* EXPLICACIÓN CLARA: ¿De qué supermercados es y cuál es el mejor precio? */}
                <div className="mt-3 p-2 bg-emerald-50/60 rounded-xl border border-emerald-100/80 space-y-0.5">
                  <div className="flex items-baseline justify-between text-[11px]">
                    <span className="text-gray-500 font-medium">Mejor precio:</span>
                    <span className="font-black text-brand-700 text-xs">
                      {cheapest.price > 0 ? formatCOP(cheapest.price) : 'En comparación'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-emerald-800 font-semibold">
                    <span className="flex items-center gap-1">
                      <Store className="w-3 h-3 text-brand-600" /> {cheapest.store}
                    </span>
                    <span className="text-gray-400 font-normal">Comparado en 6 tiendas</span>
                  </div>
                </div>
              </div>

              {/* Botón con Texto Descriptivo y Claro */}
              <div className="p-4 pt-1">
                {qty === 0 ? (
                  <button
                    onClick={() => onAddProduct(product)}
                    className="w-full py-2.5 px-3 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-brand-200/80 hover:border-transparent active:scale-98 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>+ Agregar a mi canasta</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl p-1 border border-gray-200">
                    <button
                      onClick={() => onRemoveProduct(product.id)}
                      className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors shadow-2xs font-bold text-xs"
                      aria-label="Restar una unidad"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black text-gray-900 px-3">{qty} unid.</span>
                    <button
                      onClick={() => onAddProduct(product)}
                      className="w-8 h-8 rounded-lg bg-brand-600 text-white hover:bg-brand-700 flex items-center justify-center transition-colors shadow-2xs font-bold text-xs"
                      aria-label="Aumentar una unidad"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 p-8 space-y-2">
          <p className="text-gray-800 font-bold text-sm">
            No se encontraron productos con &ldquo;{searchQuery}&rdquo;.
          </p>
          <p className="text-gray-400 text-xs">
            Intenta con palabras como: arroz, frijol, leche, huevos, café, carne o limpia pisos.
          </p>
        </div>
      )}

    </section>
  );
};
