"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const getCategoryItems = (t: (key: string) => string) => [
  { label: t('header.packs_offers'), href: "/ofertas" },
  { label: t('header.choice'), href: "/choice" },
  { label: t('header.super_offers'), href: "/superofertas" },
  { label: t('header.business'), href: "/business" },
  { label: t('header.computing'), href: "/informatica" },
  { label: t('header.telephony'), href: "/telefonia" },
  { label: t('header.accessories'), href: "/accesorios" },
  { label: t('header.jewelry'), href: "/bisuteria" },
  { label: t('header.more'), href: "/mas" },
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
  const { t } = useLanguage();
  const router = useRouter();
  const items = getCategoryItems(t);

  const handleCategoryClick = (href: string) => {
    router.push(href);
  };

  const handleCategoryHover = () => {
    setShowCategoriesDropdown(true);
  };

  const handleCategoryLeave = () => {
    setShowCategoriesDropdown(false);
  };

  return (
    <div className="w-full border-b bg-white">
      <div className="container-xl flex items-center gap-6 h-12">
        {/* Botón: Todas las categorías */}
        <div 
          className="relative"
          onMouseEnter={handleCategoryHover}
          onMouseLeave={handleCategoryLeave}
        >
          <button className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm hover:bg-gray-50 whitespace-nowrap transition-colors">
            <span className="text-xl">☰</span>
            <span>{t('header.all_categories')}</span>
            <ChevronDown size={16} />
          </button>

          {/* Dropdown de categorías */}
          {showCategoriesDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-64">
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Categorías principales</h3>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((category) => (
                    <div key={category.name} className="group">
                      <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        <ChevronDown size={14} className="text-gray-400" />
                      </div>
                      <div className="ml-4 hidden group-hover:block">
                        {category.subcategories.map((sub) => (
                          <div key={sub} className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
                            {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Links (una sola línea, sin cortes) */}
        <nav className="flex flex-1 items-center gap-8 lg:gap-10 xl:gap-12 text-sm font-medium text-gray-800 whitespace-nowrap overflow-x-auto no-scrollbar">
          {items.map((it) => (
            <button
              key={it.label}
              onClick={() => handleCategoryClick(it.href)}
              className={`inline-flex items-center px-1 hover:text-orange-500 transition ${
                it.label === t('header.packs_offers') ? "text-red-500" : ""
              }`}
            >
              {it.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoriesBar;
