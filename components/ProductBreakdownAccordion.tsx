'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Table, Check, Info } from 'lucide-react';
import { ProductPriceBreakdown } from '@/types';
import { SUPERMARKETS } from '@/lib/mockData';
import { formatCOP } from '@/lib/calculator';

interface ProductBreakdownAccordionProps {
  breakdowns: ProductPriceBreakdown[];
}

export const ProductBreakdownAccordion: React.FC<ProductBreakdownAccordionProps> = ({
  breakdowns,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (breakdowns.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden transition-all max-w-4xl mx-auto">
      
      {/* Botón Encabezado de Acordeón */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors"
      >
        <div>
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
            Desglose por producto
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compara los precios unidad por unidad en cada establecimiento
          </p>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Contenido Tabla Desplegable */}
      {isOpen && (
        <div className="border-t border-slate-100 p-4 sm:p-6 overflow-x-auto">
          
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3 w-1/4">PRODUCTO</th>
                {SUPERMARKETS.map((sm) => (
                  <th key={sm.slug} className="py-3 px-3 text-center">
                    <span className="block text-slate-800 text-xs font-bold">{sm.name.replace('Tiendas ', '').toUpperCase()}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {breakdowns.map((item) => (
                <tr key={item.product_id} className="hover:bg-slate-50/60 transition-colors">
                  
                  {/* Nombre del Producto y Unidad */}
                  <td className="py-3.5 px-3 font-semibold text-slate-900">
                    <div className="text-sm font-bold text-slate-800">{item.product_name}</div>
                    <span className="text-[11px] text-slate-500 font-normal">
                      {item.unit_of_measure} {item.quantity > 1 ? `· Cant: ${item.quantity}` : ''}
                    </span>
                  </td>

                  {/* Precios por Cada Supermercado */}
                  {SUPERMARKETS.map((sm) => {
                    const priceInfo = item.prices[sm.slug];
                    if (!priceInfo || priceInfo.total === 0) {
                      return <td key={sm.slug} className="text-center text-slate-300 py-3.5 px-3">-</td>;
                    }

                    return (
                      <td key={sm.slug} className="py-3.5 px-3 text-center align-middle">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          {priceInfo.is_cheapest ? (
                            <span className="inline-block bg-[#d1fae5] text-[#065f46] font-bold text-xs sm:text-sm px-3 py-1 rounded-full shadow-xs">
                              {formatCOP(priceInfo.total)}
                            </span>
                          ) : (
                            <span className="font-semibold text-slate-700 text-xs sm:text-sm">
                              {formatCOP(priceInfo.total)}
                            </span>
                          )}

                          {/* Marca / Producto Equivalente del Supermercado */}
                          {priceInfo.brand_name && (
                            <span className="text-[10px] text-slate-500 font-normal truncate max-w-[100px] block" title={priceInfo.brand_name}>
                              {priceInfo.brand_name}
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}

                </tr>
              ))}
            </tbody>
          </table>

          {/* Leyenda Explicativa de Equivalencias y Procedencia */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              La celda verde resalta la mejor opción. Debajo de cada precio puedes ver la marca específica de esa cadena (ej. De La Cuesta en D1, Sabrosón en Ara, Roa/Diana en tradicionales).
            </span>
          </div>

        </div>
      )}

    </div>
  );
};
