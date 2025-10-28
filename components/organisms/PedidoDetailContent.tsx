"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PedidoLoadingState from "../molecules/PedidoLoadingState";
import PedidoNotFound from "../molecules/PedidoNotFound";
import PedidoDetailLayout from "./PedidoDetailLayout";
import { usePedido } from "../../hooks/usePedido";

interface PedidoDetailContentProps {
  pedidoId: number;
}

const PedidoDetailContent: React.FC<PedidoDetailContentProps> = ({ pedidoId }) => {
  const { pedido, loading, error } = usePedido(pedidoId);
  const router = useRouter();

  if (loading) return <PedidoLoadingState />;

  if (error || !pedido) {
    return <PedidoNotFound onBack={() => router.push("/mis-pedidos")} />;
  }

  return <PedidoDetailLayout pedido={pedido} />;
};

export default PedidoDetailContent;

