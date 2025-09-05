import React from "react";
import CategoryBar from "../organisms/CategoryBar";
import HeroBanner from "../organisms/HeroBanner";
import BenefitsStrip from "../organisms/BenefitsStrip";
import OffersCarousel from "../organisms/OffersCarousel";
import Footer from "../organisms/Footer";
import HomeTemplate from "../templates/HomeTemplate";
import Ofertas from "../templates/Ofertas";

export default function Home() {
  return (
    <HomeTemplate>
      <CategoryBar />
      <HeroBanner />
      <BenefitsStrip />
      <OffersCarousel />
      <Ofertas />
      <Footer />
    </HomeTemplate>
  );
}
