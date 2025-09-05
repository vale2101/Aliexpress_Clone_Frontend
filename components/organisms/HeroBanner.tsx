"use client";

import React from "react";
import PromoCard from "../molecules/PromoCard";
import CountdownTimer from "../molecules/CountdownTimer";
import { useLanguage } from "../../contexts/LanguageContext";

const HeroBanner: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="w-full" style={{ backgroundColor: '#ff7e38' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-12">
          {/* Texto principal */}
          <div className="flex-1 text-white">
            <p className="mb-2 text-sm font-medium text-orange-100">
              {t('hero.promo_ends')}
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Hasta <span className="text-yellow-300">-60%</span> dto.
            </h1>

            {/* Timer */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              <span className="text-orange-100">{t('hero.ends_in')}</span>
              <CountdownTimer />
            </div>

            {/* Cupones debajo del timer */}
            <div className="flex gap-4">
              <div className="bg-white rounded-lg p-4 text-center min-w-[120px] shadow-lg">
                <p className="text-red-500 font-bold text-xl mb-1">-$8.300</p>
                <p className="text-xs text-gray-600 mb-1">{t('hero.orders_from')}$8.400</p>
                <p className="text-xs text-gray-500">{t('hero.code')} CO0002</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center min-w-[120px] shadow-lg">
                <p className="text-red-500 font-bold text-xl mb-1">-$22.000</p>
                <p className="text-xs text-gray-600 mb-1">{t('hero.orders_from')}$170.000</p>
                <p className="text-xs text-gray-500">{t('hero.code')} CO0005</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center min-w-[120px] shadow-lg">
                <p className="text-red-500 font-bold text-xl mb-1">-$42.000</p>
                <p className="text-xs text-gray-600 mb-1">{t('hero.orders_from')}$250.000</p>
                <p className="text-xs text-gray-500">{t('hero.code')} CO0010</p>
              </div>
            </div>
          </div>

          {/* Imagen lateral */}
          <div className="hidden lg:block w-[300px]">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop&crop=center"
                alt="Promo"
                className="h-[220px] w-full rounded-lg object-cover shadow-lg"
              />
              {/* Elementos decorativos */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-800 text-sm">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
