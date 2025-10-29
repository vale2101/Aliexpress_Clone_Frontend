"use client";
import React from "react";
import { ProductoInterface } from "../../interfaces/product.interface";
import ProductImage from "../atoms/ProductImage";
import ProductInfo from "../atoms/ProductInfo";
import PriceDisplay from "../atoms/PriceDisplay";
import StockDisplay from "../atoms/StockDisplay";
import StatusBadge from "../atoms/StatusBadge";
import ActionButtons from "../atoms/ActionButtons";

interface ProductRowProps {
  producto: ProductoInterface;
  onEdit: (id: number) => void;
  onToggleState: (id: number) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ 
  producto, 
  onEdit, 
  onToggleState 
}) => (
  <tr key={producto.id_producto} className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center gap-3">
        <ProductImage src={producto.imagen_url || ""} alt={producto.nombre} />
        <ProductInfo nombre={producto.nombre} categoria={producto.categoria} />
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <PriceDisplay precio={producto.precio} precio_original={producto.precio_original} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <StockDisplay stock={producto.stock} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <StatusBadge estado={producto.estado} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <ActionButtons 
        id={producto.id_producto} 
        estado={producto.estado}
        onEdit={onEdit} 
        onToggleState={onToggleState} 
      />
    </td>
  </tr>
);

export default ProductRow;
