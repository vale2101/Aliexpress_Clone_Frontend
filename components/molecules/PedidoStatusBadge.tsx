"use client";
import React from "react";

interface PedidoStatusBadgeProps {
  estado: string;
}

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

const PedidoStatusBadge: React.FC<PedidoStatusBadgeProps> = ({ estado }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEstadoColor(estado)}`}>
      {estado}
    </span>
  );
};

export default PedidoStatusBadge;


