"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import { productService, Product } from "../../services/productService";

export default function RecommendationsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return <p className="text-center">Cargando productos...</p>;
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-full mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Seguro que te gusta
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((p) => (
            <ProductCard
              key={p.id_producto}
              id={p.id_producto}
              image="/placeholder.png" 
              title={p.nombre}
              price={`$${p.precio} ${p.moneda}`}
              oldPrice={
                p.precio_original ? `$${p.precio_original} ${p.moneda}` : undefined
              }
              discount={p.descuento ? `-${p.descuento}%` : undefined}
              rating={4.5} 
              sold={String(p.stock)}
              label={p.estado === "activo" ? "Disponible" : "Agotado"}
              savings={
                p.precio_original
                  ? `Ahorra $${p.precio_original - p.precio} ${p.moneda}`
                  : undefined
              }
              features={[p.descripcion || "Sin descripción"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
