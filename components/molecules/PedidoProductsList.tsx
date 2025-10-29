"use client";
import React from "react";
import Text from "../atoms/Typography";
import PedidoProductItem from "./PedidoProductItem";

interface PedidoProductoItem {
  imagen?: string | null;
  nombre: string;
  cantidad: number | string;
  precio: string | number;
}

interface PedidoProductsListProps {
  productos: PedidoProductoItem[];
}

const PedidoProductsList: React.FC<PedidoProductsListProps> = ({ productos }) => {
  if (!productos || productos.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <Text variant="small" className="text-gray-600 mb-3 block">
        Productos ({productos.length})
      </Text>
      <div className="flex gap-3 overflow-x-auto">
        {productos.map((producto, index) => (
          <PedidoProductItem key={index} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default PedidoProductsList;


