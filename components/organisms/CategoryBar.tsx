"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const getCategoryItems = (t: (key: string) => string) => [
  { label: t("header.packs_offers"), href: "/packs-ofertas" },
  { label: t("header.choice"), href: "/choice" },
  { label: t("header.super_offers"), href: "/superofertas" },
  { label: t("header.business"), href: "/business" },
  { label: t("header.computing"), href: "/informatica" },
  { label: t("header.telephony"), href: "/telefonia" },
  { label: t("header.accessories"), href: "/accesorios" },
];

const categories = [
  { name: "Electrónica", subcategories: ["Teléfonos", "Computadoras", "Audio"] },
  { name: "Moda", subcategories: ["Ropa de mujer", "Ropa de hombre", "Zapatos"] },
  { name: "Hogar y jardín", subcategories: ["Muebles", "Decoración", "Electrodomésticos"] },
  { name: "Deportes", subcategories: ["Fitness", "Deportes al aire libre", "Equipamiento"] },
  { name: "Belleza", subcategories: ["Cuidado facial", "Maquillaje", "Cuidado del cabello"] },
];

const CategoriesBar: React.FC = () => {
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { t } = useLanguage();
  const router = useRouter();
  const items = getCategoryItems(t);

  const handleCategoryClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-full mx-auto px-2 sm:px-4 flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 h-8 sm:h-10">
        <div
          className="relative flex-shrink-0"
          onMouseEnter={() => setShowCategoriesDropdown(true)}
          onMouseLeave={() => {
            setShowCategoriesDropdown(false);
            setActiveCategory(null);
          }}
        >
          <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 lg:px-5 py-1 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 whitespace-nowrap transition-colors">
            <span className="text-sm sm:text-lg">☰</span>
            <span className="text-gray-700 hidden sm:inline">{t("header.all_categories")}</span>
            <ChevronDown size={12} className="text-gray-500 sm:w-4 sm:h-4" />
          </button>

          {showCategoriesDropdown && (
            <div className="absolute top-full left-0 mt-0 flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-80 sm:w-auto">
              <div className="w-full sm:w-56 border-b sm:border-b-0 sm:border-r">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    onMouseEnter={() => setActiveCategory(category.name)}
                    className={`flex items-center justify-between p-2 sm:p-3 text-xs sm:text-sm cursor-pointer hover:bg-gray-100 ${
                      activeCategory === category.name ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {category.name}
                    <ChevronRight size={12} className="text-gray-400 sm:w-4 sm:h-4" />
                  </div>
                ))}
              </div>

              {activeCategory && (
                <div className="w-full sm:w-64 p-3 sm:p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-0">
                    {categories
                      .find((cat) => cat.name === activeCategory)
                      ?.subcategories.map((sub) => (
                        <div
                          key={sub}
                          className="p-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          {sub}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Links responsive */}
        <nav className="flex items-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap overflow-x-auto no-scrollbar flex-1 justify-center">
          {items.map((it) => (
            <button
              key={it.label}
              onClick={() => handleCategoryClick(it.href)}
              className={`inline-flex items-center px-1 hover:text-orange-500 transition-colors ${
                it.label === t("header.packs_offers") ? "text-red-500 font-semibold" : ""
              }`}
            >
              {/* Texto abreviado en móvil para algunos elementos */}
              <span className="hidden sm:inline">{it.label}</span>
              <span className="sm:hidden">
                {it.label === t("header.packs_offers") ? "Packs" :
                 it.label === t("header.super_offers") ? "Super" :
                 it.label === t("header.business") ? "Business" :
                 it.label === t("header.computing") ? "Info" :
                 it.label === t("header.telephony") ? "Tel" :
                 it.label === t("header.accessories") ? "Acc" :
                 it.label === t("header.choice") ? "Choice" :
                 it.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoriesBar;
