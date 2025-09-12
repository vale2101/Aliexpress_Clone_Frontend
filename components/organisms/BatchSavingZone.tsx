"use client";

import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ProductCard from "../molecules/ProductCard";

export default function BatchSavingZone() {
  const { t } = useLanguage();
  const products = [
    {
      id: 1,
      name: "Pulsera de plata",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
      price: "$3.931,55",
      minQuantity: "≥3 pzas.",
      individualPrice: "$4.029,23",
      savings: t('buy_again.quantity_savings')
    },
    {
      id: 2,
      name: "Fundas de teclado",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop&crop=center",
      price: "$2.291,84",
      minQuantity: "≥15 pzas.",
      individualPrice: "$2.447,47",
      savings: t('buy_again.quantity_savings')
    },
    {
      id: 3,
      name: "Ratones gaming",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center",
      price: "$16.621,91",
      minQuantity: "≥3 pzas.",
      individualPrice: "$18.500,00",
      savings: t('buy_again.quantity_savings')
    },
    {
      id: 4,
      name: "Auriculares inalámbricos",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center",
      price: "$8.500,00",
      minQuantity: "≥5 pzas.",
      individualPrice: "$12.000,00",
      savings: t('buy_again.quantity_savings')
    },
    {
      id: 5,
      name: "Cargadores USB-C",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center",
      price: "$4.200,00",
      minQuantity: "≥10 pzas.",
      individualPrice: "$6.000,00",
      savings: t('buy_again.quantity_savings')
    },
    {
      id: 6,
      name: "Protectores de pantalla",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop&crop=center",
      price: "$1.800,00",
      minQuantity: "≥20 pzas.",
      individualPrice: "$3.000,00",
      savings: t('buy_again.quantity_savings')
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('batch_saving.title')}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.name}
            price={product.price}
            oldPrice={product.individualPrice}
            label={product.minQuantity}
            savings={product.savings}
          />
        ))}
      </div>
    </div>
  );
}
