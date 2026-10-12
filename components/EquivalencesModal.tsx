'use client';

import React from 'react';
import { X, Layers, CheckCircle, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { SUPERMARKETS } from '@/lib/mockData';

interface EquivalencesModalProps {
  product: Product | null;
  onClose: () => void;
}

export const EquivalencesModal: React.FC<EquivalencesModalProps> = ({ product, onClose }) => {
  if (!product || !product.equivalences) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5">
        
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Mapeo de Equivalencias
              </h3>
              <p className="text-xs text-gray-500">
                Normalización de marcas propias y comerciales
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Producto Maestro */}
        <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200/80 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image_url}
            alt={product.name}
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
            <span className="text-xs text-gray-500">
              Gramaje estándar: {product.unit_of_measure}
            </span>
          </div>
        </div>

        {/* Lista de Equivalencias por Cadena */}
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {SUPERMARKETS.map((sm) => {
            const eq = product.equivalences ? product.equivalences[sm.slug] : undefined;
            if (!eq) return null;

            return (
              <div
                key={sm.slug}
                className="p-3 rounded-2xl border border-gray-200 bg-white hover:border-brand-300 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sm.logo_url}
                    alt={sm.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">
                      {sm.name}
                    </span>
                    <span className="text-xs text-brand-700 font-semibold block">
                      {eq.store_product_name}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full border border-brand-200 inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-brand-600" />
                    {Math.round(eq.match_confidence * 100)}% Match
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">
                    Marca: {eq.store_brand}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-colors"
        >
          Entendido
        </button>

      </div>
    </div>
  );
};
