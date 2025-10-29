"use client";
import React from "react";
import { PedidoV } from "../../interfaces/pedido.interface";
import Text from "../atoms/Typography";
import PedidoHeader from "./PedidoHeader";
import PedidoProductsList from "./PedidoProductsList";

interface PedidoCardProps {
  pedido: PedidoV;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido }) => {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <PedidoHeader
          idPedido={pedido.id_pedido}
          estado={pedido.estado}
          compradorId={pedido.comprador_id}
          fechaPedido={pedido.fecha_pedido}
        />
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
        <PedidoProductsList productos={pedido.productos as any} />
      )}
    </div>
  );
};

export default PedidoCard;