"use client";
import React from "react";
import Text from "../atoms/Typography";
import { Calendar, User } from "lucide-react";
import PedidoStatusBadge from "./PedidoStatusBadge";

interface PedidoHeaderProps {
  idPedido: number | string;
  estado: string;
  compradorId: number | string;
  fechaPedido: string;
}

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

const PedidoHeader: React.FC<PedidoHeaderProps> = ({ idPedido, estado, compradorId, fechaPedido }) => {
  return (
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Text variant="subtitle" className="font-bold text-gray-900">
            Pedido #{idPedido}
          </Text>
          <PedidoStatusBadge estado={estado} />
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>Comprador #{compradorId}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(fechaPedido)}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <Text variant="small" className="text-gray-500 mb-1">
          Total
        </Text>
      </div>
    </div>
  );
};

export default PedidoHeader;


