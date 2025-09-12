"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import {
  Package,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Product {
  id?: number;
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  sold?: string;
}

interface OfferSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  type: "packs" | "super" | "big";
}

export default function OfferSection({
  title,
  subtitle,
  products,
  type,
}: OfferSectionProps) {
  const [timeLeft, setTimeLeft] = useState("07:00:00");

  useEffect(() => {
    if (type !== "super") return;

    let totalSeconds = 7 * 60 * 60;
    const timer = setInterval(() => {
      totalSeconds -= 1;
      const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      const s = String(totalSeconds % 60).padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [type]);

  const styles = {
    packs: "bg-yellow-100 text-yellow-700",
    super: "bg-red-100 text-red-700",
    big: "bg-pink-100 text-pink-700",
  };

  const icons = {
    packs: <Package className="w-4 h-4" />,
    super: <Clock className="w-4 h-4" />,
    big: <Heart className="w-4 h-4" />,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm relative">
      {/* 🔹 Header */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold">
          {title.replace("Save", "Sa")}
          <span className="text-red-600">ve</span>
        </h2>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mt-2 ${styles[type]}`}
        >
          {icons[type]}
          {type === "super" ? (
            <span>Acaba en: {timeLeft}</span>
          ) : (
            <span>{subtitle}</span>
          )}
          <span className="ml-1">➔</span>
        </div>
      </div>

      {/* 🔹 Carrusel */}
      <div className="relative group">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.swiper-button-prev-${type}`,
            nextEl: `.swiper-button-next-${type}`,
          }}
          spaceBetween={16}
          slidesPerView={2} // ✅ Siempre solo 2 productos visibles
        >
          {products.map((p, i) => (
            <SwiperSlide key={i}>
              <ProductCard {...p} id={p.id || i + 1} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 🔹 Botones de navegación: solo aparecen al pasar sobre el carrusel */}
        <button
          className={`swiper-button-prev-${type} absolute top-1/2 -left-4 z-10 
          bg-gray-800 text-white p-2 rounded-full shadow 
          opacity-0 group-hover:opacity-100 transition duration-300`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className={`swiper-button-next-${type} absolute top-1/2 -right-4 z-10 
          bg-gray-800 text-white p-2 rounded-full shadow 
          opacity-0 group-hover:opacity-100 transition duration-300`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
