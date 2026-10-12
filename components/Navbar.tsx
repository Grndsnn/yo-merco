'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, ChevronDown, MapPin, Sparkles, Check } from 'lucide-react';
import { getStoredCity, saveStoredCity } from '@/lib/storage';

interface NavbarProps {
  itemCount: number;
  onOpenBasket: () => void;
  activeTab: 'exact' | 'budget';
  onTabChange: (tab: 'exact' | 'budget') => void;
}

const CITIES = ['Manizales', 'Pereira', 'Armenia', 'Medellín', 'Bogotá', 'Cali'];

export const Navbar: React.FC<NavbarProps> = ({
  itemCount,
  onOpenBasket,
  activeTab,
  onTabChange,
}) => {
  const [selectedCity, setSelectedCity] = useState('Manizales');

  useEffect(() => {
    setSelectedCity(getStoredCity());
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    saveStoredCity(city);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Barra Superior Principal */}
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Yo Merco */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-gray-900">
                  Yo <span className="text-brand-600">Merco</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Colombia
                </span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Optimizador inteligente de presupuesto
              </p>
            </div>
          </div>

          {/* Selector de Ciudad y Botón Mi Canasta */}
          <div className="flex items-center gap-3">
            {/* Selector de Ciudad */}
            <div className="relative flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200/70 transition-colors px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-700 cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              <select
                aria-label="Seleccionar ciudad"
                value={selectedCity}
                onChange={handleCityChange}
                className="bg-transparent font-semibold text-xs focus:outline-none cursor-pointer appearance-none pr-4"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Botón Mi Canasta */}
            <button
              onClick={onOpenBasket}
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Mi Canasta</span>
              {itemCount > 0 && (
                <span className="bg-white text-brand-700 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Pestañas de Modo (Lista Exacta vs Modo Presupuesto) */}
        <div className="flex justify-center border-t border-gray-100 py-2 sm:py-2.5">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full max-w-md">
            <button
              onClick={() => onTabChange('exact')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'exact'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              📋 Modo Lista Exacta
            </button>
            <button
              onClick={() => onTabChange('budget')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'budget'
                  ? 'bg-white text-brand-700 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>💰 Modo Presupuesto</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
