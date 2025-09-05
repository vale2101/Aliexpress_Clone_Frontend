"use client";

import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

export default function PromotionalBanner() {
  const { t } = useLanguage();
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-500 py-12 px-4">
      <div className="max-w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Contenido de texto */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold italic mb-2">
              {t('promo.title')}
            </h1>
            <p className="text-xl mb-6 text-blue-100">
              {t('promo.subtitle')}
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              {t('promo.buy')}
            </button>
          </div>

          {/* Imagen promocional */}
          <div className="relative">
            <div className="aspect-square bg-white/20 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop&crop=center"
                alt="Modelo de moda"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
