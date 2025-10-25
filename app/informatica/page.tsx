"use client";
import React from "react";
import RecommendationsSection from "../../components/organisms/RecommendationsSection";
import FeaturedProducts from "../../components/organisms/FeaturedProducts";

export default function InformaticaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Informática y escuela
          </h1>
          <p className="text-gray-600">
            Todo lo que necesitas para la oficina y el estudio.
          </p>
        </div>

        <FeaturedProducts categories={["Informática", "Escuela"]} />

        <RecommendationsSection />
      </div>
    </div>
  );
}
