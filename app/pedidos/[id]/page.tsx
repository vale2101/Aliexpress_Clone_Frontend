"use client";

import React from "react";
import { useParams } from "next/navigation";
import PedidoDetailContent from "../../../components/organisms/PedidoDetailContent";

export default function PedidoDetailPage() {
  const params = useParams();
  const pedidoId = Number(params.id);

  return <PedidoDetailContent pedidoId={pedidoId} />;
}

