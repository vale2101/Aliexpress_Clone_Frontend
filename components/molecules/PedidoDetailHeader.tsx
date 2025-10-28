import React from "react";
import Text from "../atoms/Typography";
import { Package, Calendar } from "lucide-react";

interface PedidoDetailHeaderProps {
  idPedido: number;
  estado: string;
  fechaPedido: string;
}

const PedidoDetailHeader: React.FC<PedidoDetailHeaderProps> = ({
  idPedido,
  estado,
  fechaPedido
}) => {
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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8 text-orange-500" />
          <div>
            <Text variant="title" className="font-bold text-gray-900">
              Pedido #{idPedido}
            </Text>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4 text-gray-500" />
              <Text variant="small" className="text-gray-600">
                {formatDate(fechaPedido)}
              </Text>
            </div>
          </div>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getEstadoColor(estado)}`}>
          {estado}
        </span>
      </div>
    </div>
  );
};

export default PedidoDetailHeader;

