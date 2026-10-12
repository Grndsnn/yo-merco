'use client';

import React from 'react';
import { TrendingDown, BellRing, Plus, ArrowRight, Zap } from 'lucide-react';
import { PriceDropAlert, Product } from '@/types';
import { PRICE_DROP_ALERTS, PRODUCTS } from '@/lib/mockData';
import { formatCOP } from '@/lib/calculator';

interface PriceDropAlertsProps {
  onAddProduct: (product: Product) => void;
}

export const PriceDropAlerts: React.FC<PriceDropAlertsProps> = ({ onAddProduct }) => {
  const getProductObj = (prodId: string) => {
    return PRODUCTS.find((p) => p.id === prodId) || PRODUCTS[0];
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl border border-emerald-500/20 space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <BellRing className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                Alertas Activas de Bajada de Precios
              </h3>
              <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase">
                En Vivo (Manizales)
              </span>
            </div>
            <p className="text-xs text-emerald-200/80">
              Oportunidades de ahorro detectadas en el último ciclo de monitoreo
            </p>
          </div>
        </div>

        <div className="text-xs text-emerald-300/90 font-medium flex items-center gap-1.5 self-start sm:self-auto bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Actualizado hace minutos</span>
        </div>
      </div>

      {/* Grid de Alertas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {PRICE_DROP_ALERTS.map((alert) => {
          const productObj = getProductObj(alert.product_id);

          return (
            <div
              key={alert.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-emerald-400/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md">
                    {alert.supermarket_name}
                  </span>
                  <span className="text-xs font-black text-amber-300 flex items-center gap-0.5">
                    <TrendingDown className="w-3.5 h-3.5" />
                    -{alert.drop_percentage}%
                  </span>
                </div>

                <div className="flex items-center gap-2.5 my-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={alert.image_url}
                    alt={alert.product_name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {alert.product_name}
                    </h4>
                    <span className="text-[10px] text-gray-400">
                      {alert.unit_of_measure}
                    </span>
                  </div>
                </div>

                <div className="mt-2 space-y-0.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-extrabold text-white">
                      {formatCOP(alert.current_price)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {formatCOP(alert.previous_price)}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-300 font-semibold block">
                    Ahorras {formatCOP(alert.savings_cop)} por unidad
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[9px] text-gray-400">
                  {alert.date_detected}
                </span>

                <button
                  onClick={() => onAddProduct(productObj)}
                  className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-transform active:scale-95 shadow-sm"
                  title="Agregar a mi canasta"
                >
                  <Plus className="w-3 h-3" />
                  <span>Aprovechar</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
