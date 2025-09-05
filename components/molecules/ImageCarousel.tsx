"use client";

import React, { useState, useEffect } from "react";

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

const carouselImages: CarouselImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    alt: "Shopping online",
    title: "Los nuevos usuarios obtienen -70% dto.",
    subtitle: "Ofertas increíbles te esperan"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    alt: "Fashion shopping",
    title: "Envío gratis en pedidos +$50",
    subtitle: "Tecnología al mejor precio"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop",
    alt: "Home decor",
    title: "Moda de temporada -50%",
    subtitle: "Estilo único para ti"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    alt: "Electronics shopping",
    title: "Hogar y decoración -40%",
    subtitle: "Haz tu casa perfecta"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
    alt: "Beauty products",
    title: "Belleza y cuidado -60%",
    subtitle: "Cuida tu piel todos los días"
  }
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image.src})` }}
            >
              {/* Overlay más sutil para mostrar mejor las imágenes */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-white text-center">
                  <div className="bg-black bg-opacity-50 rounded-lg p-8 backdrop-blur-sm">
                    <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
                      {image.title}
                    </h2>
                    <p className="text-xl mb-8 opacity-95 drop-shadow-md">
                      {image.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="flex justify-center space-x-2">
          {carouselImages.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => goToSlide(dotIndex)}
              className={`w-8 h-1 rounded transition-all duration-300 ${
                dotIndex === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{ 
              width: `${((currentIndex + 1) / carouselImages.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}
