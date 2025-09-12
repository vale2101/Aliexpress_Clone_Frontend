import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoriesGrid() {
  const categories = [
    {
      id: 1,
      name: "Informática y escuela",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop&crop=center",
      icon: "💻"
    },
    {
      id: 2,
      name: "Telefonía y comunicación",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&crop=center",
      icon: "📱"
    },
    {
      id: 3,
      name: "Accesorios",
      image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop&crop=center",
      icon: "🧢"
    },
    {
      id: 4,
      name: "Bisutería y relojes",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop&crop=center",
      icon: "💍"
    },
    {
      id: 5,
      name: "Hogar y jardín",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop&crop=center",
      icon: "🌿"
    }
  ];

  return (
    <div className="bg-white py-8">
      <div className="max-w-full mx-auto px-4">
        <div className="relative">
          {/* Botón de navegación izquierda */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          {/* Botón de navegación derecha */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          {/* Grid de categorías */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 px-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group cursor-pointer hover:bg-gray-50 rounded-lg p-4 transition-colors"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 text-center group-hover:text-orange-500 transition-colors">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
