"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import { productService, ProductoInterface } from "../../services/productService";

interface RelatedProductsProps {
  currentProductId: number; 
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId }) => {
  const [products, setProducts] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const allProducts = await productService.getAll();
        const filtered = allProducts.filter(
          (product) => product.id_producto !== currentProductId
        );
        setProducts(filtered);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [currentProductId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Productos relacionados</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg aspect-square animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No hay productos relacionados.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Productos relacionados</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id_producto}
            id={product.id_producto}
            image={product.imagen_url || "/placeholder.jpg"}
            title={product.nombre}
            price={`${product.precio} ${product.moneda}`}
            oldPrice={
              product.precio_original
                ? `${product.precio_original} ${product.moneda}`
                : undefined
            }
            discount={product.descuento ? `-${product.descuento}%` : undefined}
            rating={4.5}
            sold={`${product.stock} vendidos`}
            label={product.estado === "activo" ? "Disponible" : "Agotado"}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
