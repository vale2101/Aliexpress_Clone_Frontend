"use client";
import React from "react";
import Text from "../atoms/Typography";

interface PedidoProductoItem {
  imagen?: string | null;
  nombre: string;
  cantidad: number | string;
  precio: string | number;
}

interface PedidoProductItemProps {
  producto: PedidoProductoItem;
}

const PedidoProductItem: React.FC<PedidoProductItemProps> = ({ producto }) => {
  const priceNumber = typeof producto.precio === "string" ? parseFloat(producto.precio) : producto.precio;

  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 min-w-[200px]">
      <img
        src={producto.imagen || "/placeholder.jpg"}
        alt={producto.nombre}
        className="w-12 h-12 object-cover rounded"
      />
      <div className="flex-1 min-w-0">
        <Text
          variant="body"
          className="text-sm font-medium text-gray-900 truncate"
        >
          {producto.nombre}
        </Text>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>Cant: {producto.cantidad}</span>
          <span>·</span>
          <span className="text-orange-500 font-medium">
            ${priceNumber.toLocaleString("es-CO")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PedidoProductItem;


