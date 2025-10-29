"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import OfferSection from "./OfferSection";
import { productService } from "../../services/productService";
import { ProductoInterface } from "../../interfaces/product.interface";
import { BadgeCheck, Zap, DollarSign } from "lucide-react";

export default function AliExpressBusinessBanner() {
  const { t } = useLanguage();

  const [products, setProducts] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const allProducts = await productService.getAllActive();
        setProducts(Array.isArray(allProducts) ? allProducts : []);
      } catch (error) {
        console.error("❌ Error cargando productos:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const getRandomSubset = (items: ProductoInterface[], count: number) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Seleccionar 6 productos aleatorios para la zona de ahorro
  const ahorroProducts = getRandomSubset(products, 6);

  // Seleccionar productos aleatorios para "Volver a comprar" (mantener algunos productos diferentes)
  const volverProducts = getRandomSubset(products, 4);

  return (
    <div className="bg-white">
      <div className="relative bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=600&fit=crop&crop=center')",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center mb-4 sm:mb-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white shadow rounded p-2 sm:p-3">
              <OfferSection
                title="Zona ahorro en lote"
                subtitle=""
                type="big"
                products={ahorroProducts.map((p, i) => ({
                  id: p.id_producto || i + 1,
                  image: p.imagen_url || "/placeholder.jpg",
                  title: p.nombre,
                  price: `$${p.precio} ${p.moneda || ""}`,
                  oldPrice: p.precio_original
                    ? `$${p.precio_original} ${p.moneda || ""}`
                    : undefined,
                  label: "Ahorro",
                  minQuantity: "≥3 pzas.",
                }))}
              />
            </div>

            <div className="bg-white shadow rounded p-2 sm:p-3">
              <OfferSection
                title="Volver a comprar"
                subtitle=""
                type="big"
                products={volverProducts.map((p, i) => ({
                  id: p.id_producto || i + 1,
                  image: p.imagen_url || "/placeholder.jpg",
                  title: p.nombre,
                  price: `$${p.precio} ${p.moneda || ""}`,
                  oldPrice: p.precio_original
                    ? `$${p.precio_original} ${p.moneda || ""}`
                    : undefined,
                  label: "Visto antes",
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}