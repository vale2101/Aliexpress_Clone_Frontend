"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ProductCard from "../molecules/ProductCard";
import { productService } from "../../services/productService";
import { ProductoInterface } from "../../interfaces/product.interface";

export default function BatchSavingZone() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await productService.getAllActive();
        
        
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 6);
        
        setProducts(randomProducts);
      } catch (error) {
        console.error("❌ Error cargando productos en BatchSavingZone:", error);
        console.error("❌ Detalles del error:", {
          message: error instanceof Error ? error.message : 'Error desconocido',
          stack: error instanceof Error ? error.stack : undefined
        });
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-2">{t("loading")}...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("batch_saving.title")}
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No hay productos disponibles en este momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {t("batch_saving.title")}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id_producto || index}
            id={product.id_producto}
            image={product.imagen_url || "/placeholder.jpg"}
            title={product.nombre}
            price={`$${product.precio} ${product.moneda ?? ""}`}
            oldPrice={
              product.precio_original
                ? `$${product.precio_original} ${product.moneda ?? ""}`
                : undefined
            }
            label={`≥${product.stock > 1 ? product.stock : 1} pzas.`}
            savings={
              product.descuento
                ? `-${product.descuento}%`
                : t("buy_again.quantity_savings")
            }
          />
        ))}
      </div>
    </div>
  );
}
