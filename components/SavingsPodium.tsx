'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SupermarketComparisonResult } from '@/types';
import { formatCOP } from '@/lib/calculator';

interface SavingsPodiumProps {
  results: SupermarketComparisonResult[];
  onScrollToBreakdown?: () => void;
}

export const SavingsPodium: React.FC<SavingsPodiumProps> = ({
  results,
  onScrollToBreakdown,
}) => {
  // Orden de podio: 1ro en el centro, 2do a la izquierda, 3ro a la derecha
  const first = results[0];
  const second = results[1] || results[0];
  const third = results[2] || results[0];
  const remaining = results.slice(3);

  // Lanzar confeti al calcular
  useEffect(() => {
    if (first && first.total_market_cost > 0) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#059669', '#10b981', '#34d399', '#f59e0b'],
        });
      } catch (err) {
        console.debug('Confetti error', err);
      }
    }
  }, [first]);

  if (!first || results.length === 0) return null;

  const getSupermarketBadgeNote = (slug: string, rank: number, diffSavings: number) => {
    if (rank === 1) {
      return diffSavings > 0
        ? `Ahorras ${formatCOP(diffSavings)} frente al más costoso`
        : 'Mejor precio global en tu canasta';
    }
    if (slug === 'ara') return 'Buena opción en despensa';
    if (slug === 'mercaldas') return 'Mejor precio en frescos';
    if (slug === 'centro') return 'Precios mayoristas competitivos';
    if (slug === 'exito') return 'Gran surtido en marcas';
    if (slug === 'carulla') return 'Productos premium';
    return `Puesto #${rank}`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Encabezado Exacto de la Captura */}
      <div className="text-center space-y-1">
        <span className="text-[11px] font-bold text-emerald-600 tracking-widest uppercase">
          COMPARACIÓN COMPLETADA
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Resultados para tu lista
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Encontramos la mejor opción entre 6 supermercados en Manizales.
        </p>
      </div>

      {/* Grid del Podio de 3 Supermercados (2° Lugar, 1° Lugar Campeón, 3° Lugar) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end max-w-4xl mx-auto">
        
        {/* ================= SEGUNDO LUGAR (IZQUIERDA) ================= */}
        {second && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow order-2 md:order-1">
            <div>
              <div className="flex items-center justify-between">
                {/* Logo Ara / Segundo Lugar */}
                <div className="h-10 px-3 bg-amber-400 rounded-xl flex items-center justify-center shadow-xs">
                  <span className="font-black text-slate-950 text-sm tracking-tight">
                    {second.supermarket.name.replace('Tiendas ', '')}
                  </span>
                </div>
                <span className="text-3xl font-black text-slate-200">2°</span>
              </div>

              <div className="mt-5 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                  SEGUNDO LUGAR
                </span>
                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  {formatCOP(second.total_market_cost)}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {getSupermarketBadgeNote(second.supermarket.slug, 2, 0)}
                </p>
              </div>
            </div>

            <button
              onClick={onScrollToBreakdown}
              className="mt-6 w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-1"
            >
              <span>Ver detalles</span>
              <span>&gt;</span>
            </button>
          </div>
        )}

        {/* ================= PRIMER LUGAR (CENTRO - DESTACADO VERDE) ================= */}
        <div className="bg-emerald-600 rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-emerald-700/20 relative flex flex-col justify-between md:-translate-y-2 order-1 md:order-2">
          <div>
            <div className="flex items-center justify-between">
              {/* Logo D1 / Ganador */}
              <div className="h-10 px-3 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <span className="font-black text-red-600 text-base tracking-tight">
                  {first.supermarket.name.replace('Tiendas ', '')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-amber-300 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  MEJOR PRECIO
                </span>
                <span className="text-3xl font-black text-emerald-200">1°</span>
              </div>
            </div>

            <div className="mt-5 space-y-1">
              <span className="text-[11px] font-bold text-emerald-100 tracking-wider uppercase block">
                GANADOR DE TU MERCADO
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {formatCOP(first.total_market_cost)}
              </div>
              <p className="text-xs text-emerald-100 font-medium">
                {getSupermarketBadgeNote(first.supermarket.slug, 1, first.savings_vs_highest)}
              </p>
            </div>
          </div>

          <button
            onClick={onScrollToBreakdown}
            className="mt-6 w-full py-2.5 px-4 bg-emerald-900/60 hover:bg-emerald-900/80 text-white font-bold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-1 border border-white/10"
          >
            <span>Ver detalles</span>
            <span>&gt;</span>
          </button>
        </div>

        {/* ================= TERCER LUGAR (DERECHA) ================= */}
        {third && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow order-3">
            <div>
              <div className="flex items-center justify-between">
                {/* Logo Mercaldas / Tercer Lugar */}
                <div className="h-10 px-3 bg-slate-100 rounded-xl flex items-center justify-center">
                  <span className="font-extrabold text-blue-700 text-sm tracking-tight">
                    {third.supermarket.name}
                  </span>
                </div>
                <span className="text-3xl font-black text-slate-200">3°</span>
              </div>

              <div className="mt-5 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
                  TERCER LUGAR
                </span>
                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  {formatCOP(third.total_market_cost)}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {getSupermarketBadgeNote(third.supermarket.slug, 3, 0)}
                </p>
              </div>
            </div>

            <button
              onClick={onScrollToBreakdown}
              className="mt-6 w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-1"
            >
              <span>Ver detalles</span>
              <span>&gt;</span>
            </button>
          </div>
        )}

      </div>

      {/* Otras Tiendas Analizadas (4°, 5° y 6° Lugar) de forma compacta y limpia */}
      {remaining.length > 0 && (
        <div className="max-w-4xl mx-auto bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-600">
          {remaining.map((item) => (
            <div key={item.supermarket.slug} className="flex items-center gap-2">
              <span className="font-bold text-slate-400">{item.rank}°</span>
              <span className="font-medium text-slate-700">{item.supermarket.name}:</span>
              <span className="font-bold text-slate-900">{formatCOP(item.total_market_cost)}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
