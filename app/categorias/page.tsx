"use client";
import React from "react";
import RecommendationsSection from "../../components/organisms/RecommendationsSection";
import CategoriesGrid from "../../components/organisms/CategoriesGrid";

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Todas las categorías
          </h1>
          <p className="text-gray-600">
            Explora todas las categorías disponibles en nuestra tienda.
          </p>
        </div>
        
        {/* Grid de categorías */}
        <CategoriesGrid />
        
        {/* Productos recomendados */}
        <RecommendationsSection />
      </div>
    </div>
  );
}

