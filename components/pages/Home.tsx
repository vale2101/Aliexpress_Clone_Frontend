import React from "react";
import CategoryBar from "../organisms/CategoryBar";
import HeroBanner from "../organisms/HeroBanner";
import BenefitsStrip from "../organisms/BenefitsStrip";
import AliExpressBusinessBanner from "../organisms/AliExpressBusinessBanner";
import BatchSavingZone from "../organisms/BatchSavingZone";
import BuyAgainSection from "../organisms/BuyAgainSection";
import RecommendationsSection from "../organisms/RecommendationsSection";
import PromoWithCategories from "../organisms/PromoWithCategories";
import HomeLayout from "../layouts/HomeLayout";
import OffersSection from "../organisms/OffersSection";

export default function Home() {
  return (
    <HomeLayout>
      <CategoryBar />
      <HeroBanner />
      <BenefitsStrip />
      
      {/* Secciones de ofertas */}
      <OffersSection />
      
      {/* Banner de AliExpress Business */}
      <AliExpressBusinessBanner />
      
      {/* Secciones de productos */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-full mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <BatchSavingZone />
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <BuyAgainSection />
            </div>
          </div>
        </div>
      </div>
      
      {/* Banner promocional Viva */}
      <PromoWithCategories />
      
      
      
      {/* Sección de recomendaciones */}
      <RecommendationsSection />
    </HomeLayout>
  );
}
