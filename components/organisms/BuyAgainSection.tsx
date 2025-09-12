"use client";

import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ProductCard from "../atoms/ProductCard";

export default function BuyAgainSection() {
  const { t } = useLanguage();
  const products = [
    {
      id: 1,
      name: "Aspiradora robot",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center",
      currentPrice: "$55.602,59",
      originalPrice: "$97.978,63",
      label: t('buy_again.similar_items'),
      discount: "43% OFF"
    },
    {
      id: 2,
      name: "Notebook keyboard cap/Hinge",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop&crop=center",
      currentPrice: "$4.029,23",
      originalPrice: "$23.869,95",
      label: t('buy_again.seen_before'),
      discount: "83% OFF",
      button: "Give Video Installation Tutorial ►"
    },
    {
      id: 3,
      name: "T2 TWS",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center",
      currentPrice: "$26.283,19",
      originalPrice: "$61.123,97",
      label: t('buy_again.seen_before'),
      discount: "57% OFF",
      features: ["Low latency", "Wireless 5.2"]
    },
    {
      id: 4,
      name: "Almohada de pesadilla antes de navidad",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center",
      currentPrice: "$4.029,23",
      originalPrice: "$14.924,43",
      label: "Choice",
      discount: "73% OFF",
      rating: 4.8,
      sold: `63 ${t('buy_again.sold')}`
    },
    {
      id: 5,
      name: "Smartwatch deportivo",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center",
      currentPrice: "$89.500,00",
      originalPrice: "$150.000,00",
      label: t('buy_again.seen_before'),
      discount: "40% OFF",
      rating: 4.6,
      sold: `250+ ${t('buy_again.sold')}`
    },
    {
      id: 6,
      name: "Cámara de seguridad Wi-Fi",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center",
      currentPrice: "$45.000,00",
      originalPrice: "$80.000,00",
      label: t('buy_again.similar_items'),
      discount: "44% OFF",
      rating: 4.4,
      sold: `120 ${t('buy_again.sold')}`
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('buy_again.title')}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.name}
            price={product.currentPrice}
            oldPrice={product.originalPrice}
            discount={product.discount}
            rating={product.rating}
            sold={product.sold}
            label={product.label}
            features={product.features}
            button={product.button}
          />
        ))}
      </div>
    </div>
  );
}
