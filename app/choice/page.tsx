"use client";

import React from "react";
import RecommendationsSection from "../../components/organisms/RecommendationsSection";
import FeaturedProducts from "../../components/organisms/FeaturedProducts";

export default function ChoicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-2">
            Choice
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-red-600">
            Mejores servicios y artículos selectos en Choice
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <FeaturedProducts categories={["choice", "juguetes", "moda"]} />
        <RecommendationsSection />
      </div>
    </div>
  );
}