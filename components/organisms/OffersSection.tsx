"use client";
import React, { useEffect, useState } from "react";
import OfferSection from "./OfferSection";
import { productService } from "../../services/productService";
import { ProductoInterface } from "../../interfaces/product.interface";

export default function OffersSection() {
  const [products, setProducts] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const response = await productService.getAll();

        const data = Array.isArray(response)
          ? response
          : (response as any)?.data || (response as any)?.productos || [];

        if (!Array.isArray(data)) {
          console.error("El backend no devolvió una lista válida. Respuesta:", response);
          setProducts([]);
          return;
        }

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

  const normalize = (str?: string) => str?.trim().toLowerCase();

  const packsProducts = products.filter(
    (p) => normalize(p.categoria) === "oferta"
  );
  const superProducts = products.filter(
    (p) => normalize(p.categoria) === "super ofertas"
  );
  const bigSaveProducts = products.filter(
    (p) => normalize(p.categoria) === "big save"
  );

  if (loading) {
    return (
      <div className="bg-white py-8">
        <div className="max-w-full mx-auto px-4">
          <p className="text-center text-gray-500">Cargando ofertas...</p>
        </div>
      </div>
    );
  }

  if (
    packsProducts.length === 0 &&
    superProducts.length === 0 &&
    bigSaveProducts.length === 0
  ) {
    return (
      <div className="bg-white py-8">
        <div className="max-w-full mx-auto px-4">
          <p className="text-center text-gray-500">No hay ofertas disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="max-w-full mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packsProducts.length > 0 && (
            <OfferSection
              title="Packs de ofertas"
              subtitle="3 desde 2,99$ US | -20% dto. Extra"
              type="packs"
              products={packsProducts.map((p, i) => ({
                id: p.id_producto || i + 1,
                image: p.imagen_url || "/placeholder.jpg",
                title: p.nombre,
                price: `$${p.precio} ${p.moneda || ""}`,
                oldPrice: p.precio_original
                  ? `$${p.precio_original} ${p.moneda || ""}`
                  : undefined,
                rating: 4.5,
                sold: `${p.stock} disponibles`,
              }))}
            />
          )}

          {superProducts.length > 0 && (
            <OfferSection
              title="SuperOfertas"
              subtitle="Aprovecha antes que termine"
              type="super"
              products={superProducts.map((p, i) => ({
                id: p.id_producto || i + 1,
                image: p.imagen_url || "/placeholder.jpg",
                title: p.nombre,
                price: `$${p.precio} ${p.moneda || ""}`,
                oldPrice: p.precio_original
                  ? `$${p.precio_original} ${p.moneda || ""}`
                  : undefined,
                discount: p.descuento ? `-${p.descuento}%` : undefined,
                rating: 4.5,
                sold: `${p.stock} disponibles`,
              }))}
            />
          )}

          {bigSaveProducts.length > 0 && (
            <OfferSection
              title="Big Save"
              subtitle="+500 Marcas"
              type="big"
              products={bigSaveProducts.map((p, i) => ({
                id: p.id_producto || i + 1,
                image: p.imagen_url || "/placeholder.jpg",
                title: p.nombre,
                price: `$${p.precio} ${p.moneda || ""}`,
                oldPrice: p.precio_original
                  ? `$${p.precio_original} ${p.moneda || ""}`
                  : undefined,
                discount: p.descuento ? `-${p.descuento}%` : undefined,
                rating: 4.5,
                sold: `${p.stock} disponibles`,
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}