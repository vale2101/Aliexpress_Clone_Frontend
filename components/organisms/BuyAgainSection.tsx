"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ProductCard from "../molecules/ProductCard";
import { productService } from "../../services/productService";
import { ProductoInterface } from "../../interfaces/product.interface";

export default function BuyAgainSection() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const allProducts = await productService.getAll();

        const filtered = allProducts.filter(
          (p) => p.categoria?.trim().toLowerCase() === "volverc"
        );

        setProducts(filtered.slice(0, 6));
      } catch (error) {
        console.error("Error cargando productos:", error);
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("buy_again.title")}</h2>
        <p className="text-center text-gray-500">Cargando productos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("buy_again.title")}</h2>
        <p className="text-center text-gray-500">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("buy_again.title")}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id_producto}
            id={product.id_producto}
            image={product.imagen_url || "/placeholder.jpg"}
            title={product.nombre}
            price={`$${product.precio} ${product.moneda || ""}`}
            oldPrice={
              product.precio_original
                ? `$${product.precio_original} ${product.moneda || ""}`
                : undefined
            }
            discount={product.descuento ? `-${product.descuento}%` : undefined}
            rating={4.5}
            sold={`${product.stock} disponibles`}
            label={product.estado === "activo" ? "Disponible" : "Inactivo"}
          />
        ))}
      </div>
    </div>
  );
}