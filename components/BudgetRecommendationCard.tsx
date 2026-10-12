'use client';

import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Wallet, 
  ShoppingBag,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BudgetOptimizationResult } from '@/lib/calculator';
import { formatCOP } from '@/lib/calculator';

interface BudgetRecommendationCardProps {
  optimization: BudgetOptimizationResult;
  onScrollToBreakdown?: () => void;
}

export const BudgetRecommendationCard: React.FC<BudgetRecommendationCardProps> = ({
  optimization,
  onScrollToBreakdown,
}) => {
  const {
    budget_amount,
    recommended_store,
    cheapest_store,
    stores_analysis,
    surplus_or_deficit,
    status,
  } = optimization;

  const recommendedStoreAnalysis = stores_analysis.find(
    (s) => s.supermarket.slug === recommended_store.slug
  );

  const isSurplus = status === 'surplus';
  const isDeficit = status === 'deficit';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden max-w-4xl mx-auto animate-fade-in">
      
      {/* Banner Principal de Recomendación */}
      <div className={`p-6 sm:p-7 ${
        isSurplus 
          ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white' 
          : 'bg-gradient-to-r from-amber-600 to-orange-700 text-white'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Optimización Inteligente de Presupuesto</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isSurplus ? (
                <>Te recomendamos comprar en <span className="underline decoration-amber-300 underline-offset-4">{recommended_store.name}</span></>
              ) : (
                <>Tu presupuesto es ajustado: <span className="underline decoration-amber-300 underline-offset-4">{recommended_store.name}</span> es tu mejor opción</>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-white/90 font-medium">
              {isSurplus ? (
                `¡Tu presupuesto cubre toda la canasta! Te sobra dinero en ${stores_analysis.filter(s => s.fits_in_budget).length} de los 6 supermercados.`
              ) : (
                `Para tu presupuesto de ${formatCOP(budget_amount)}, ${recommended_store.name} es la tienda que te permite llevar la mayor cantidad de mercado.`
              )}
            </p>
          </div>

          {/* Tarjeta de Resumen Presupuesto vs Gasto */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shrink-0 text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
              {isSurplus ? 'DINERO QUE TE SOBRA' : 'DIFERENCIA FALTANTE'}
            </span>
            <div className="text-2xl sm:text-3xl font-black tracking-tight">
              {formatCOP(Math.abs(surplus_or_deficit))}
            </div>
            <span className="text-[11px] text-white/90 font-semibold block mt-0.5">
              Presupuesto: {formatCOP(budget_amount)}
            </span>
          </div>

        </div>
      </div>

      {/* Comparativa de cómo le va a cada Supermercado con tu Presupuesto */}
      <div className="p-6 sm:p-7 space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
              ¿En cuáles supermercados te alcanza el dinero?
            </h3>
            <p className="text-xs text-slate-500">
              Evaluamos si tu presupuesto cubre la canasta completa o cuánta cobertura te da en cada cadena
            </p>
          </div>

          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl hidden sm:inline-block">
            Meta: {formatCOP(budget_amount)}
          </span>
        </div>

        {/* Grid de las 6 tiendas evaluadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {stores_analysis.map((storeAnalysis) => {
            const isWinner = storeAnalysis.supermarket.slug === recommended_store.slug;
            const fits = storeAnalysis.fits_in_budget;

            return (
              <div
                key={storeAnalysis.supermarket.slug}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isWinner
                    ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20'
                    : fits
                    ? 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                    : 'border-rose-200 bg-rose-50/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-slate-900 text-sm">
                      {storeAnalysis.supermarket.name.replace('Tiendas ', '')}
                    </span>

                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      fits
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      {fits ? 'Alcanza' : `${storeAnalysis.coverage_percentage}%`}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Costo Total
                    </span>
                    <div className="text-xl font-black text-slate-900">
                      {formatCOP(storeAnalysis.total_cost)}
                    </div>
                  </div>

                  {/* Detalle si sobra o falta */}
                  <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs flex items-center justify-between">
                    <span className="text-slate-500 font-medium">
                      {fits ? 'Te sobran:' : 'Te faltan:'}
                    </span>
                    <span className={`font-black ${fits ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {fits ? `+${formatCOP(storeAnalysis.remaining_cop)}` : `-${formatCOP(Math.abs(storeAnalysis.difference_cop))}`}
                    </span>
                  </div>
                </div>

                {isWinner && (
                  <div className="mt-3 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 rounded-xl px-2.5 py-1 text-center">
                    ⭐ Opción más inteligente para tu bolsillo
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Consejo Práctico de Ahorro */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">¿Cómo calcula la recomendación?</span>
            Si tu presupuesto es de {formatCOP(budget_amount)}, el sistema selecciona automáticamente la tienda que te garantiza comprar la lista completa al menor costo posible, maximizando tu dinero disponible para otros gastos del hogar.
          </div>
        </div>

      </div>

    </div>
  );
};
