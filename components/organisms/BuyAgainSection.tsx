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
        console.log("🔄 Iniciando carga de productos en BuyAgainSection...");
        const allProducts = await productService.getAllActive();
        console.log("✅ Productos cargados en BuyAgainSection:", allProducts.length);
        
        // Seleccionar 6 productos aleatorios
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 6);
        console.log("🎲 Productos aleatorios seleccionados para BuyAgain:", randomProducts.length);
        
        setProducts(randomProducts);
      } catch (error) {
        console.error("❌ Error cargando productos en BuyAgainSection:", error);
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