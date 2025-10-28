import React from "react";
import Link from "next/link";
import { Pedido } from "../../interfaces/pedido.interface";
import Text from "../atoms/Typography";
import Button from "../atoms/Button";
import { Package, Eye, Calendar } from "lucide-react";

interface PedidoCardProps {
  pedido: Pedido;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido }) => {
  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-500";
      case "pagado":
      case "en proceso":
        return "bg-blue-500";
      case "enviado":
        return "bg-purple-500";
      case "completado":
      case "entregado":
        return "bg-green-500";
      case "cancelado":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Badge de estado */}
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-md text-white text-sm font-medium ${getEstadoColor(pedido.estado)}`}>
            {pedido.estado}
          </span>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Text variant="subtitle" className="font-bold mb-2">
              Pedido #{pedido.id_pedido}
            </Text>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(pedido.fecha_pedido)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Productos del pedido */}
        <div className="space-y-4 mb-4">
          {pedido.productos && pedido.productos.length > 0 ? (
            pedido.productos.map((producto, index) => (
              <div key={index} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg">
                <img
                  src={producto.imagen || "/placeholder.jpg"}
                  alt={producto.nombre}
                  className="w-28 h-28 object-cover rounded-lg border-2 border-white"
                />
                <div className="flex-1">
                  <Text variant="body" className="font-medium mb-1 text-gray-900">
                    {producto.nombre}
                  </Text>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Cantidad: {producto.cantidad}</span>
                    <span className="text-orange-500 font-bold text-base">
                      ${producto.precio * producto.cantidad}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-3 text-gray-500">
              <Package className="w-5 h-5" />
              <Text variant="body">No hay productos disponibles</Text>
            </div>
          )}
        </div>

        {/* Total y acciones */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-baseline gap-4">
            <div>
              <Text variant="small" className="text-gray-500 block mb-1">
                Total del pedido
              </Text>
              <Text variant="subtitle" className="font-bold text-2xl text-orange-500">
                ${pedido.total}
              </Text>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href={`/pedidos/${pedido.id_pedido}`}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md flex items-center gap-2 font-medium">
                <Eye className="w-4 h-4" />
                Ver detalles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoCard;

