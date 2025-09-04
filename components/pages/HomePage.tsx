import React from "react";
import Navbar from "../organisms/Navbar";
import CategoryBar from "../organisms/CategoryBar";
import HeroBanner from "../organisms/HeroBanner";
import BenefitsStrip from "../organisms/BenefitsStrip";
import OffersCarousel from "../organisms/OffersCarousel";
import Footer from "../organisms/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <CategoryBar />
      <HeroBanner />
      <BenefitsStrip />
      <OffersCarousel />
      <Footer />
    </>
  );
}
