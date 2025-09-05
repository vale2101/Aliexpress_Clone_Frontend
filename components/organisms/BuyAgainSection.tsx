"use client";

import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";

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
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discount}
                </div>
              )}
              {product.label && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-semibold">
                  {product.label}
                </div>
              )}
            </div>
            
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">{product.name}</h3>
              
              {product.features && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.features.map((feature, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-600">{product.currentPrice}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                </div>
                
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">{product.rating}</span>
                    {product.sold && (
                      <span className="text-xs text-gray-500">• {product.sold}</span>
                    )}
                  </div>
                )}
                
                <div className="text-xs text-gray-600">
                  {product.label}
                </div>
                
                {product.button && (
                  <button className="w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded transition-colors">
                    {product.button}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
