'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { PresetBasket } from '@/types';
import { PRESET_BASKETS } from '@/lib/mockData';
import { formatCOP } from '@/lib/calculator';

interface PresetBasketsProps {
  onLoadPreset: (preset: PresetBasket) => void;
  activePresetId?: string | null;
}

export const PresetBaskets: React.FC<PresetBasketsProps> = ({
  onLoadPreset,
  activePresetId,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 text-base sm:text-lg">
              Canastas Predeterminadas Inteligentes
            </h3>
            <p className="text-xs text-gray-500">
              Carga con 1 solo clic combinaciones recomendadas para tu hogar
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRESET_BASKETS.map((preset) => {
          const isActive = activePresetId === preset.id;

          return (
            <div
              key={preset.id}
              className={`bg-white rounded-2xl border p-4.5 flex flex-col justify-between transition-all hover:shadow-md ${
                isActive
                  ? 'border-brand-500 ring-2 ring-brand-400 bg-brand-50/20'
                  : 'border-gray-200 hover:border-brand-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-2xl p-2 bg-gray-50 rounded-xl border border-gray-100">
                    {preset.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {preset.badge}
                  </span>
                </div>

                <h4 className="font-bold text-gray-900 text-sm leading-snug">
                  {preset.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {preset.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 space-y-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] text-gray-400 font-medium">
                    Estimado promedio:
                  </span>
                  <span className="text-sm font-extrabold text-brand-700">
                    ~{formatCOP(preset.estimated_price_cop)}
                  </span>
                </div>

                <button
                  onClick={() => onLoadPreset(preset)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-98 ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-brand-600 text-gray-700 hover:text-white'
                  }`}
                >
                  {isActive ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Canasta Aplicada
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5" /> Cargar esta Canasta
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
