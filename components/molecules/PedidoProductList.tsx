import React from "react";
import PedidoProductItem from "./PedidoProductItem";
import Text from "../atoms/Typography";
import { Package } from "lucide-react";

interface PedidoProductListProps {
  productos: Array<{
    id_producto: number;
    nombre: string;
    imagen: string;
    precio: number;
    cantidad: number;
  }>;
}

const PedidoProductList: React.FC<PedidoProductListProps> = ({ productos }) => {
  if (!productos || productos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <Text variant="title" className="text-gray-500 mb-2">
          No hay productos disponibles
        </Text>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <Text variant="title" className="font-bold text-gray-900 mb-4">
        Productos del pedido ({productos.length})
      </Text>
      <div className="space-y-3">
        {productos.map((producto, index) => (
          <PedidoProductItem
            key={index}
            imagen={producto.imagen}
            nombre={producto.nombre}
            precio={producto.precio}
            cantidad={producto.cantidad}
          />
        ))}
      </div>
    </div>
  );
};

export default PedidoProductList;

