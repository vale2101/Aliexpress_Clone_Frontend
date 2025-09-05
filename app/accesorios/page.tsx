"use client";
import React from "react";
import RecommendationsSection from "../../components/organisms/RecommendationsSection";
import FeaturedProducts from "../../components/organisms/FeaturedProducts";

export default function AccesoriosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Accesorios
          </h1>
          <p className="text-gray-600">
            Complementa tu estilo con nuestros accesorios.
          </p>
        </div>
        
        {/* Productos destacados */}
        <FeaturedProducts />
        
        {/* Productos recomendados */}
        <RecommendationsSection />
      </div>
    </div>
  );
}

