'use client';

import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { BasketItem } from '@/types';

interface BasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  basket: BasketItem[];
  onAddProduct: (item: BasketItem['product']) => void;
  onRemoveProduct: (productId: string) => void;
  onClearBasket: () => void;
  onCalculate: () => void;
}

export const BasketDrawer: React.FC<BasketDrawerProps> = ({
  isOpen,
  onClose,
  basket,
  onAddProduct,
  onRemoveProduct,
  onClearBasket,
  onCalculate,
}) => {
  if (!isOpen) return null;

  const totalItemsCount = basket.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">Mi Canasta</h3>
                <span className="text-xs text-gray-500">
                  {totalItemsCount} {totalItemsCount === 1 ? 'artículo' : 'artículos'} agregados
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {basket.length > 0 && (
                <button
                  onClick={onClearBasket}
                  title="Vaciar toda la canasta"
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Listado de Ítems */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3 divide-y divide-gray-100">
            {basket.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-3">
                <ShoppingBag className="w-12 h-12 text-gray-300 stroke-[1.5]" />
                <div>
                  <p className="font-medium text-gray-700 text-sm">Tu canasta está vacía</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Selecciona productos del catálogo para comparar los precios en D1, Ara, Mercaldas, Centro, Éxito y Carulla.
                  </p>
                </div>
              </div>
            ) : (
              basket.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                        {item.product.name}
                      </p>
                      <span className="text-[11px] text-gray-500">
                        {item.product.unit_of_measure}
                      </span>
                    </div>
                  </div>

                  {/* Controles de Cantidad */}
                  <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl p-1 shrink-0">
                    <button
                      onClick={() => onRemoveProduct(item.product.id)}
                      className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-red-600 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-gray-900 px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onAddProduct(item.product)}
                      className="w-7 h-7 rounded-lg bg-brand-600 text-white hover:bg-brand-700 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer con Botón de Comparar */}
          {basket.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-3">
              <button
                onClick={() => {
                  onCalculate();
                  onClose();
                }}
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl text-sm font-bold shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span>Calcular y Comparar Ahorro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
