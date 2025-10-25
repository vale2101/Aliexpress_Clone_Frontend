"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import { productService, ProductoInterface } from "../../services/productService";

interface FeaturedProductsProps {
  categories?: string[];
}

export default function FeaturedProducts({ categories }: FeaturedProductsProps) {
  const [products, setProducts] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await productService.getAll();

        // 🔹 Filtrar por categoría si se pasa la prop
        const filtered =
          categories && categories.length > 0
            ? data.filter((p: ProductoInterface) =>
                p.categoria ? categories.includes(p.categoria) : false
              )
            : data;

        setProducts(filtered);
      } catch (error) {
        console.error("❌ Error cargando productos:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [categories]);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando productos...</p>;
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No hay productos disponibles en esta categoría
      </p>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id_producto}
              id={p.id_producto}
              image={p.imagen_url || "/placeholder.jpg"}
              title={p.nombre}
              price={`$${p.precio} ${p.moneda ?? ""}`}
              oldPrice={
                p.precio_original
                  ? `$${p.precio_original} ${p.moneda ?? ""}`
                  : undefined
              }
              discount={p.descuento ? `-${p.descuento}%` : undefined}
              rating={4.5}
              sold={`${p.stock} disponibles`}
              label={p.estado === "activo" ? "Disponible" : "Inactivo"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
