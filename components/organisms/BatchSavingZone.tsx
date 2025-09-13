"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ProductCard from "../molecules/ProductCard";
import { productService, Product } from "../../services/productService";

export default function BatchSavingZone() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop&crop=center",
  ];

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos en BatchSavingZone:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return <p className="text-center">{t("loading")}...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("batch_saving.title")}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id_producto}
            id={product.id_producto}
            image={product.imagen_url || fallbackImages[index % fallbackImages.length]}
            title={product.nombre}
            price={`$${product.precio} ${product.moneda}`}
            oldPrice={product.precio_original ? `$${product.precio_original} ${product.moneda}` : undefined}
            label={`≥${product.stock > 1 ? product.stock : 1} pzas.`}
            savings={product.descuento ? `-${product.descuento}%` : t("buy_again.quantity_savings")}
          />
        ))}
      </div>
    </div>
  );
}
