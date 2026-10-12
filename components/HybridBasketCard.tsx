'use client';

import React from 'react';
import { Bus, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { HybridBasketSuggestion } from '@/types';
import { formatCOP } from '@/lib/calculator';

interface HybridBasketCardProps {
  hybridData: HybridBasketSuggestion;
}

export const HybridBasketCard: React.FC<HybridBasketCardProps> = ({ hybridData }) => {
  if (hybridData.number_of_stores_involved <= 1) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-6 max-w-4xl mx-auto transition-all">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Estrategia Multitienda
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {hybridData.number_of_stores_involved} supermercados combinados
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">
            Canasta Híbrida Inteligente
          </h3>
          <p className="text-xs text-slate-500">
            Calculamos si te conviene dividir la compra entre varias tiendas teniendo en cuenta el transporte.
          </p>
        </div>

        {/* Veredicto de Ahorro Neto */}
        <div className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 self-start sm:self-auto border ${
          hybridData.is_hybrid_worth_it
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-amber-50 text-amber-800 border-amber-200'
        }`}>
          {hybridData.is_hybrid_worth_it ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Vale la pena dividir la compra!</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Mejor comprar en una sola tienda</span>
            </>
          )}
        </div>
      </div>

      {/* Tarjetas de Métricas Financieras (Total Dividido, Pasaje Bus, Ahorro Neto) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
            Costo Combinado
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 block">
            {formatCOP(hybridData.hybrid_total_cop)}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Suma de los mejores precios
          </span>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
            <Bus className="w-3.5 h-3.5 text-amber-600" /> Costo de Transporte / Pasaje
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-700 mt-0.5 block">
            -{formatCOP(hybridData.estimated_extra_transport_cost_cop)}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            2 pasajes de bus urbano (Manizales)
          </span>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
          <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-bold block">
            Ahorro Neto Real
          </span>
          <span className={`text-xl sm:text-2xl font-black mt-0.5 block ${
            hybridData.net_savings_cop > 0 ? 'text-emerald-800' : 'text-slate-600'
          }`}>
            {formatCOP(Math.max(0, hybridData.net_savings_cop))}
          </span>
          <span className="text-[11px] text-emerald-700/80 font-medium">
            {hybridData.net_savings_cop > 0 ? 'Ahorro ya libre de pasajes' : 'El pasaje supera la diferencia'}
          </span>
        </div>
      </div>

      {/* Desglose de Qué Comprar en Dónde */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          ¿Qué comprar en cada tienda para maximizar tu ahorro?
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(hybridData.store_breakdown).map(([slug, data]) => (
            <div
              key={slug}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-extrabold text-sm text-slate-900">{data.store_name}</span>
                  <span className="text-xs font-black text-emerald-700">
                    {formatCOP(data.subtotal_cop)}
                  </span>
                </div>

                <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
                  {data.items.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between text-[11px]">
                      <span className="truncate max-w-[140px] font-medium text-slate-700">{item.product_name}</span>
                      <span className="text-slate-400 font-semibold">{formatCOP(item.price)}</span>
                    </li>
                  ))}
                  {data.items.length > 3 && (
                    <li className="text-[10px] text-emerald-700 font-bold pt-0.5">
                      + {data.items.length - 3} productos más aquí
                    </li>
                  )}
                </ul>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{data.items_count} artículos asignados</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
