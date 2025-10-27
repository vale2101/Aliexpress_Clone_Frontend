"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { productService } from "../../services/productService";
import { ProductoInterface } from "../../interfaces/product.interface";

type CardProps = { title: string; price: string; img: string; store?: string };

const Item = ({ title, price, img, store }: CardProps) => (
  <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="aspect-square overflow-hidden bg-gray-100">
      <Image
        src={img}
        alt={title}
        width={300}
        height={300}
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-3">
      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{title}</h3>
      {store && <p className="text-xs text-gray-500 mb-2">{store}</p>}
      <p className="text-lg font-bold text-red-600">{price}</p>
    </div>
  </div>
);

const OffersCarousel = () => {
  const [items, setItems] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        setLoading(true);
        const products = await productService.getAll();

        const mapped = products.slice(0, 6).map((p) => ({
          title: p.nombre,
          price: `$${p.precio} ${p.moneda || ""}`,
          img: p.imagen_url || "/placeholder.jpg",
          store: p.categoria || undefined,
        }));

        setItems(mapped);
      } catch (error) {
        console.error("Error cargando ofertas:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadOffers();
  }, []);

  return (
    <section className="bg-white py-8">
      <div className="max-w-full mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Ofertas de hoy</h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando productos...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">No hay ofertas disponibles</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {items.map((it, i) => (
              <Item key={i} {...it} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OffersCarousel;