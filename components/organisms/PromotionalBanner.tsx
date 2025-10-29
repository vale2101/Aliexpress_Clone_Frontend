"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../../contexts/LanguageContext";
import { productService } from "../../services/productService";
import { ProductoInterface } from "../../interfaces/product.interface";

export default function PromotionalBanner() {
  const { t } = useLanguage();
  const [promoProducts, setPromoProducts] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para validar y limpiar URLs de imágenes
  const getValidImageUrl = (url?: string): string => {
    if (!url) return "/placeholder.jpg";
    
    // Si es una URL de Google con parámetros, usar placeholder
    if (url.includes("google.com/url") || url.includes("googleusercontent.com")) {
      return "/placeholder.jpg";
    }
    
    // Si es una URL válida, usarla
    try {
      new URL(url);
      return url;
    } catch {
      return "/placeholder.jpg";
    }
  };

  useEffect(() => {
    async function loadPromoProducts() {
      try {
        setLoading(true);
        const allProducts = await productService.getAllActive();

        const filtered = allProducts
          .filter((p) => p.categoria?.trim().toLowerCase() === "moda")
          .slice(0, 3); // Mostrar máximo 3

        setPromoProducts(filtered);
      } catch (error) {
        console.error("❌ Error cargando productos promocionales:", error);
        setPromoProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadPromoProducts();
  }, []);

  return (
    <div className="bg-sky-200 rounded-2xl shadow-md overflow-hidden p-6 flex flex-col justify-between">
      <div className="text-black mb-6">
        <h1 className="text-3xl font-bold italic mb-2">Viva</h1>
        <p className="text-lg mb-4">{t("promo.subtitle") ?? "Tu elección de moda"}</p>
        <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
          {t("promo.buy") ?? "Comprar"}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-700 text-sm">Cargando productos...</p>
      ) : promoProducts.length === 0 ? (
        <p className="text-center text-gray-700 text-sm">No hay productos de moda disponibles</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {promoProducts.map((product) => (
            <div key={product.id_producto} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src={getValidImageUrl(product.imagen_url)}
                alt={product.nombre}
                width={200}
                height={160}
                className="w-full h-40 object-cover"
              />
              <div className="p-2 text-sm">
                <p className="font-bold">
                  ${product.precio} {product.moneda || ""}
                </p>
                {product.precio_original && (
                  <p className="text-gray-500 line-through text-xs">
                    ${product.precio_original} {product.moneda || ""}
                  </p>
                )}
                <div className="flex justify-between text-xs mt-1 text-gray-700">
                  <span>⭐ 4.5</span>
                  <span>{product.stock} vendidos</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}