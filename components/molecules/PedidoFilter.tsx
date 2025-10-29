"use client";
import React from "react";
import { Filter } from "lucide-react";

interface PedidoFilterProps {
  selectedEstado: string;
  onEstadoChange: (estado: string) => void;
}

const PedidoFilter: React.FC<PedidoFilterProps> = ({
  selectedEstado,
  onEstadoChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <select
          value={selectedEstado}
          onChange={(e) => onEstadoChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="all">Todos los pedidos</option>
          <option value="pendiente">Pendiente</option>
          <option value="pagado">Pagado</option>
          <option value="en proceso">En proceso</option>
          <option value="enviado">Enviado</option>
          <option value="completado">Completado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
    </div>
  );
};

export default PedidoFilter;
