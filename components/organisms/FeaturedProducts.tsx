"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import { productService, Product } from "../../services/productService";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop&crop=center",
  ];

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos destacados:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando productos destacados...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No hay productos disponibles</p>;
  }

  return (
    <div className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Productos destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p, index) => (
            <ProductCard
              key={p.id_producto}
              id={p.id_producto}
              image={
                p.imagen_url && p.imagen_url.trim() !== ""
                  ? p.imagen_url
                  : fallbackImages[index % fallbackImages.length]
              }
              title={p.nombre}
              price={`$${p.precio} ${p.moneda ?? ""}`}
              oldPrice={
                p.precio_original ? `$${p.precio_original} ${p.moneda ?? ""}` : undefined
              }
              discount={p.descuento ? `-${p.descuento}%` : undefined}
              rating={4.5} // 🔹 esto lo puedes reemplazar con data real si lo tienes en la BD
              sold={`${p.stock} disponibles`}
              label={p.estado === "activo" ? "Disponible" : "Agotado"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
