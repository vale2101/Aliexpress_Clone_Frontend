"use client";

import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import OfferSection from "../molecules/OfferSection";

// 📦 Importamos íconos desde lucide-react
import { BadgeCheck, Zap, DollarSign } from "lucide-react";

export default function AliExpressBusinessBanner() {
  const { t } = useLanguage();

  const batchProducts = [
    {
      id: 1,
      image: "https://ae01.alicdn.com/kf/S5b56f1f1d1ad45acaf19c48596b3c9bdy.jpg",
      title: "Figuras pixeladas One Piece - LINKGO",
      price: "$14.806,24",
      label: "CE",
      minQuantity: "≥3 pzas.",
    },
    {
      id: 2,
      image: "https://ae01.alicdn.com/kf/S46a8c1b292eb4058a8bdbdbf3f1b6c67a.jpg",
      title: "Figuras pixeladas Mario Bros",
      price: "$14.266,13",
      minQuantity: "≥3 pzas.",
    },
    {
      id: 3,
      image: "https://ae01.alicdn.com/kf/S91f3f45f9ff24f63b3b8f43d55a6f0cfW.jpg",
      title: "Ventiladores para laptop",
      price: "$99.306,04",
      individualPrice: "$106.780,69 precio individual",
      minQuantity: "≥3 pzas.",
    },
  ];

  const buyAgainProducts = [
    {
      id: 4,
      image: "https://ae01.alicdn.com/kf/Sa7e0c2a5c12d4c6ebbd7f73a7f6d8e5cN.jpg",
      title: "Peluche How To Train Your Dragon",
      price: "$5.477,04",
      oldPrice: "$25.346,91",
      label: "Visto antes",
    },
    {
      id: 5,
      image: "https://ae01.alicdn.com/kf/S50c595f3fa3b4057a5dd0c49e8d8d6d9x.jpg",
      title: "Figura pixelada Stitch",
      price: "$76.526,55",
      oldPrice: "$218.645,69",
      label: "Visto antes",
    },
    {
      id: 6,
      image: "https://ae01.alicdn.com/kf/S19d27d6b1b8d44c79b2c0a6b2f4a2a93M.jpg",
      title: "Bisagras Smernit 170°",
      price: "$3.934,23",
      oldPrice: "$11.762,96",
      label: "Artículos similares",
    },
  ];

  return (
    <div className="bg-white">
      <div className="relative bg-black">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=600&fit=crop&crop=center')",
          }}
        ></div>

        {/* Contenedor */}
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center mb-4 sm:mb-6">
            {/* Lado izquierdo */}
            <div className="text-center md:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                AliExpress <span className="text-orange-500">Business</span>
              </h1>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2 text-white text-xs sm:text-sm">
                  <BadgeCheck size={16} className="sm:w-[18px] sm:h-[18px]" /> 
                  <span>Exenciones fiscales</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-white text-xs sm:text-sm">
                  <Zap size={16} className="sm:w-[18px] sm:h-[18px]" /> 
                  <span>Pagos Express</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 text-white text-xs sm:text-sm">
                  <DollarSign size={16} className="sm:w-[18px] sm:h-[18px]" /> 
                  <span>Apoyo financiero</span>
                </div>
              </div>
              <button className="bg-white text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm shadow hover:bg-gray-100 mt-3 sm:mt-4 transition-colors">
                Comprar
              </button>
            </div>

            {/* Stats - Solo texto sin fondo */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 text-white text-center">
              <div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">5M+</div>
                <div className="text-xs sm:text-sm">Suministro directo</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">10</div>
                <div className="text-xs sm:text-sm">Almacenes locales</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">20M+</div>
                <div className="text-xs sm:text-sm">Artículos dropshipping</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">24H</div>
                <div className="text-xs sm:text-sm">Abastecimiento rápido</div>
              </div>
            </div>
          </div>

          {/* Secciones productos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white shadow rounded p-2 sm:p-3">
              <OfferSection title="Zona ahorro en lote" products={batchProducts} subtitle={""} type={"big"} />
            </div>
            <div className="bg-white shadow rounded p-2 sm:p-3">
              <OfferSection title="Volver a comprar" products={buyAgainProducts} subtitle={""} type={"big"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
