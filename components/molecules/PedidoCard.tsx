"use client";
import React from "react";
import { PedidoV } from "../../interfaces/pedido.interface";
import Text from "../atoms/Typography";
import { Calendar, User } from "lucide-react";

interface PedidoCardProps {
  pedido: PedidoV;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido }) => {
  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "pagado":
      case "en proceso":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "enviado":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "completado":
      case "entregado":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelado":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatDate = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Text variant="subtitle" className="font-bold text-gray-900">
              Pedido #{pedido.id_pedido}
            </Text>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(
                pedido.estado
              )}`}
            >
              {pedido.estado}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>Comprador #{pedido.comprador_id}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(pedido.fecha_pedido)}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <Text variant="small" className="text-gray-500 mb-1">
            Total
          </Text>
          <Text variant="subtitle" className="font-bold text-2xl text-orange-500">
            ${pedido.total.toLocaleString("es-CO")}
          </Text>
        </div>
      </div>

      {pedido.productos && pedido.productos.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <Text variant="small" className="text-gray-600 mb-3 block">
            Productos ({pedido.productos.length})
          </Text>
          <div className="flex gap-3 overflow-x-auto">
            {pedido.productos.map((producto, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 min-w-[200px]"
              >
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
                      ${parseFloat(producto.precio).toLocaleString("es-CO")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidoCard;