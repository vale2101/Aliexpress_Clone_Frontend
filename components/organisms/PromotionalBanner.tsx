"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../../contexts/LanguageContext";

export default function PromotionalBanner() {
  const { t } = useLanguage();

  // Productos de ejemplo
  const promoProducts = [
    {
      id: 3,
      image: "https://ae01.alicdn.com/kf/S91f3f45f9ff24f63b3b8f43d55a6f0cfW.jpg",
      title: "Conjunto amarillo",
      price: "$117.192,50",
      oldPrice: "$204.739,16",
      rating: "⭐ 4.9",
      sold: "5.000+ vendidos",
    },
  ];

  return (
    <div className="bg-sky-200 rounded-2xl shadow-md overflow-hidden p-6 flex flex-col justify-between">
      {/* Título */}
      <div className="text-black mb-6">
        <h1 className="text-3xl font-bold italic mb-2">Viva</h1>
        <p className="text-lg mb-4">{t("promo.subtitle") ?? "Tu elección de moda"}</p>
        <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
          {t("promo.buy") ?? "Comprar"}
        </button>
      </div>

      {/* Productos destacados */}
      <div className="grid grid-cols-3 gap-4">
        {promoProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={160}
              className="w-full h-40 object-cover"
            />
            <div className="p-2 text-sm">
              <p className="font-bold">{product.price}</p>
              <p className="text-gray-500 line-through text-xs">{product.oldPrice}</p>
              <div className="flex justify-between text-xs mt-1 text-gray-700">
                <span>{product.rating}</span>
                <span>{product.sold}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
