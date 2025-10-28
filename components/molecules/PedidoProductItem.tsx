import React from "react";
import Text from "../atoms/Typography";

interface PedidoProductItemProps {
  imagen: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

const PedidoProductItem: React.FC<PedidoProductItemProps> = ({
  imagen,
  nombre,
  precio,
  cantidad
}) => {
  const subtotal = precio * cantidad;

  return (
    <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
      <img
        src={imagen || "/placeholder.jpg"}
        alt={nombre}
        className="w-24 h-24 object-cover rounded-lg border-2 border-white shadow-sm"
      />
      <div className="flex-1">
        <Text variant="body" className="font-medium text-gray-900 mb-2">
          {nombre}
        </Text>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Text variant="small" className="text-gray-600">
              Cantidad:
            </Text>
            <span className="font-semibold text-gray-900">
              {cantidad}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Text variant="small" className="text-gray-600">
              Precio unitario:
            </Text>
            <Text variant="body" className="font-semibold text-gray-900">
              ${precio}
            </Text>
          </div>
        </div>
      </div>
      <div className="text-right">
        <Text variant="small" className="text-gray-600 mb-1">
          Subtotal
        </Text>
        <Text variant="subtitle" className="font-bold text-2xl text-orange-500">
          ${subtotal}
        </Text>
      </div>
    </div>
  );
};

export default PedidoProductItem;

