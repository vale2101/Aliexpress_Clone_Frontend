"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const getCategoryItems = (t: (key: string) => string) => [
  { label: t('header.packs_offers'), href: "/packs-ofertas" },
  { label: t('header.choice'), href: "/choice" },
  { label: t('header.super_offers'), href: "/superofertas" },
  { label: t('header.business'), href: "/business" },
  { label: "Juguetes y juegos", href: "/juguetes" },
  { label: t('header.computing'), href: "/informatica" },
  { label: t('header.telephony'), href: "/telefonia" },
  { label: t('header.accessories'), href: "/accesorios" },
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
      <div className="max-w-full mx-auto px-4 flex items-center justify-center gap-6 h-10">
        {/* Botón: Todas las categorías */}
        <div 
          className="relative"
          onMouseEnter={handleCategoryHover}
          onMouseLeave={handleCategoryLeave}
        >
          <button className="flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 whitespace-nowrap transition-colors">
            <span className="text-lg">☰</span>
            <span className="text-gray-700">{t('header.all_categories')}</span>
            <ChevronDown size={14} className="text-gray-500" />
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
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700 whitespace-nowrap overflow-x-auto no-scrollbar">
          {items.map((it) => (
            <button
              key={it.label}
              onClick={() => handleCategoryClick(it.href)}
              className={`inline-flex items-center px-1 hover:text-orange-500 transition-colors ${
                it.label === t('header.packs_offers') ? "text-red-500 font-semibold" : ""
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
