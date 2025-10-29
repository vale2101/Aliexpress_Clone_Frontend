"use client";
import React from "react";
import { PedidoV } from "../../interfaces/pedido.interface";
import Text from "../atoms/Typography";
import { Package } from "lucide-react";
import PedidoCard from "./PedidoCard";

interface PedidoListProps {
  pedidos: PedidoV[];
  loading: boolean;
}

const PedidoList: React.FC<PedidoListProps> = ({ pedidos, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <Text variant="subtitle" className="text-gray-500 mb-2">
            No hay pedidos disponibles
          </Text>
          <Text variant="body" className="text-gray-400">
            Los pedidos aparecerán aquí cuando se realicen compras
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-200">
        {pedidos.map((pedido) => (
          <PedidoCard key={pedido.id_pedido} pedido={pedido} />
        ))}
      </div>
    </div>
  );
};

export default PedidoList;
