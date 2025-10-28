import React from "react";
import { ProductoInterface } from "../../interfaces/product.interface";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: ProductoInterface[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((producto) => (
        <ProductCard
          key={producto.id_producto}
          id={producto.id_producto}
          title={producto.nombre}
          price={`$${producto.precio}`}
          oldPrice={producto.precio_original ? `$${producto.precio_original}` : undefined}
          image={producto.imagen_url || "/placeholder.jpg"}
          discount={producto.descuento ? `${producto.descuento}%` : undefined}
          features={producto.descripcion ? [producto.descripcion] : undefined}
          button="Ver producto"
        />
      ))}
    </div>
  );
};

export default ProductGrid;

