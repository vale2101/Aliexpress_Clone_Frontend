import React from "react";
import CategoryBar from "../organisms/CategoryBar";
import HeroBanner from "../organisms/HeroBanner";
import BenefitsStrip from "../organisms/BenefitsStrip";
import AliExpressBusinessBanner from "../organisms/AliExpressBusinessBanner";
import ProductSectionsContainer from "../molecules/ProductSectionsContainer";
import PromotionalBanner from "../organisms/PromotionalBanner";
import FeaturedProducts from "../organisms/FeaturedProducts";
import CategoriesGrid from "../organisms/CategoriesGrid";
import RecommendationsSection from "../organisms/RecommendationsSection";
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
      
      {/* Contenedor molecular para las secciones de productos */}
      <ProductSectionsContainer />
      
      {/* Banner promocional Viva */}
      <PromotionalBanner />
      
      {/* Productos destacados */}
      <FeaturedProducts />
      
      {/* Grid de categorías */}
      <CategoriesGrid />
      
      {/* Sección de recomendaciones */}
      <RecommendationsSection />
    </HomeLayout>
  );
}
