"use client";

import React, { useEffect, useState } from "react";

const IMAGES = [
  {
    id: 1,
    src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQAz4fcILbAOgkdR1g8zRObsR7rxq6VuNL6A&s",
    alt: "Bodega 1",
  },
  {
    id: 2,
    src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsgxIhwCvTftclJt-upGeknt3CKo1TWbbjsw&s",
    alt: "Bodega 2",
  },
];

export default function VendedorCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {IMAGES.map((img, i) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img.src})` }}
          />
        </div>
      ))}

      {/* Glass card bottom-left */}
      <div className="absolute left-12 bottom-12">
        <div className="max-w-lg bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/10">
          <h3 className="text-3xl font-extrabold text-white mb-2 drop-shadow">
            Años de Crecimiento Constante
          </h3>
          <p className="text-white/90 text-sm leading-relaxed">
            Comenzamos en 2010 y ya somos una de las empresas B2C más grandes
            del mundo.
          </p>
        </div>
      </div>

      {/* Dots centered bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-10 h-2 rounded-full transition-all duration-300 ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
