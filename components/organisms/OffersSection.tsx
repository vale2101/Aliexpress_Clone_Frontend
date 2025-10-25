"use client";
import React, { useEffect, useState } from "react";
import OfferSection from "./OfferSection";
import { productService, ProductoInterface } from "../../services/productService";

export default function OffersSection() {
  const [products, setProducts] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await productService.getAll();
        setProducts(data);
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
      <div className="bg-white py-8">
        <div className="max-w-full mx-auto px-4">
          <p className="text-center text-gray-500">Cargando ofertas...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white py-8">
        <div className="max-w-full mx-auto px-4">
          <p className="text-center text-gray-500">No hay ofertas disponibles</p>
        </div>
      </div>
    );
  }

  // Dividir productos en grupos para diferentes secciones
  const packsProducts = products.slice(0, 6);
  const superProducts = products.slice(6, 12);
  const bigSaveProducts = products.slice(12, 18);

  return (
    <>
      {/* Secciones superiores */}
      <div className="bg-white py-8">
        <div className="max-w-full mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <OfferSection
              title="Packs de ofertas"
              subtitle="3 desde 2,99$ US | -20% dto. Extra"
              type="packs"
              products={packsProducts.map(p => ({
                image: p.imagen_url || "/placeholder.jpg",
                title: p.nombre,
                price: `$${p.precio} ${p.moneda || ""}`,
                oldPrice: p.precio_original ? `$${p.precio_original} ${p.moneda || ""}` : undefined,
                rating: 4.5,
                sold: `${p.stock} disponibles`
              }))}
            />

            <OfferSection
              title="SuperOfertas"
              subtitle="Acaba en: 07:00:00"
              type="super"
              products={superProducts.map(p => ({
                image: p.imagen_url || "/placeholder.jpg",
                title: p.nombre,
                price: `$${p.precio} ${p.moneda || ""}`,
                oldPrice: p.precio_original ? `$${p.precio_original} ${p.moneda || ""}` : undefined,
                discount: p.descuento ? `-${p.descuento}%` : undefined,
                rating: 4.5,
                sold: `${p.stock} disponibles`
              }))}
            />

            <OfferSection
              title="Big Save"
              subtitle="+500 Marcas"
              type="big"
              products={bigSaveProducts.map(p => ({
                image: p.imagen_url || "/placeholder.jpg",
                title: p.nombre,
                price: `$${p.precio} ${p.moneda || ""}`,
                oldPrice: p.precio_original ? `$${p.precio_original} ${p.moneda || ""}` : undefined,
                discount: p.descuento ? `-${p.descuento}%` : undefined,
                rating: 4.5,
                sold: `${p.stock} disponibles`
              }))}
            />
          </div>
        </div>
      </div>
    </>
  );
}
