import React from "react";

interface ProductInfoProps {
  nombre: string;
  categoria?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ nombre, categoria }) => (
  <div>
    <div className="text-sm font-medium text-gray-900">{nombre}</div>
    <div className="text-sm text-gray-500">{categoria || "Sin categoría"}</div>
  </div>
);

export default ProductInfo;
