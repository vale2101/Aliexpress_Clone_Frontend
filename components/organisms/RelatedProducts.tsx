"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import { ProductService, ProductoInterface } from "../../services/ProductService";

interface RelatedProductsProps {
  currentProductId: number;
  category?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  currentProductId
}) => {
  const [products, setProducts] = useState<ProductoInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRelatedProducts() {
      try {
        setLoading(true);
        const allProducts = await ProductService.getAll();
        // Filtrar el producto actual y tomar los primeros 4
        const relatedProducts = allProducts
          .filter(p => p.id_producto !== currentProductId)
          .slice(0, 4);
        setProducts(relatedProducts);
      } catch (error) {
        console.error("Error cargando productos relacionados:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadRelatedProducts();
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
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Productos relacionados</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id_producto}
            id={product.id_producto}
            image={`https://images.unsplash.com/photo-${1500000000000 + (product.id_producto ?? 0)}?w=300&h=300&fit=crop&crop=center`}
            title={product.nombre}
            price={`${product.precio} ${product.moneda}`}
            oldPrice={
              product.precio_original ? `${product.precio_original} ${product.moneda}` : undefined
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
