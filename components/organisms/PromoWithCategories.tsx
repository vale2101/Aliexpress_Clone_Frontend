"use client";

import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import PromotionalBanner from "./PromotionalBanner";
import CategoriesGrid from "./CategoriesGrid";

export default function PromoWithCategories() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("Ofertas por categoría") ?? "Ofertas por categoría"}
        </h2>

        {/* Layout tipo AliExpress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Izquierda - Promo con productos */}
          <PromotionalBanner />

          {/* Derecha - Grid categorías */}
          <div className="lg:col-span-2">
            <CategoriesGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
