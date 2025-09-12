"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../atoms/ProductCard";
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
    return <p className="text-center">Cargando productos destacados...</p>;
  }

  return (
    <div className="bg-white py-8">
      <div className="max-w-full mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, index) => (
            <ProductCard
              key={p.id_producto}
              id={p.id_producto}
              image={fallbackImages[index % fallbackImages.length]} 
              title={p.nombre}
              price={`$${p.precio} ${p.moneda}`}
              oldPrice={
                p.precio_original ? `$${p.precio_original} ${p.moneda}` : undefined
              }
              discount={p.descuento ? `-${p.descuento}%` : undefined}
              rating={4.5} 
              sold={`${p.stock} vendidos`}
              label={p.estado === "activo" ? "Disponible" : "Agotado"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
