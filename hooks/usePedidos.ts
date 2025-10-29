"use client";
import { useState, useEffect } from "react";
import { PedidoV } from "../interfaces/pedido.interface";
import { PedidoVService } from "../services/pedidoVService";
import { useAuth } from "./useAuth";

interface UsePedidosReturn {
  pedidos: PedidoV[];
  loading: boolean;
  error: string | null;
  filteredPedidos: PedidoV[];
  selectedEstado: string;
  setSelectedEstado: (estado: string) => void;
  refetch: () => void;
}

export const usePedidos = (): UsePedidosReturn => {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState<PedidoV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEstado, setSelectedEstado] = useState<string>("all");

  const loadPedidos = async (idVendedor: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await PedidoVService.getPedidosPorVendedor(idVendedor);
      setPedidos(data);
    } catch (err) {
      console.error("Error loading pedidos:", err);
      setError("Error al cargar los pedidos");
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (user?.rol === 3 && user.id_usuario) {
      loadPedidos(user.id_usuario);
    }
  };

  useEffect(() => {
    if (user?.rol === 3 && user.id_usuario) {
      loadPedidos(user.id_usuario);
    } else {
      setLoading(false);
    }
  }, [user]);

  const filteredPedidos =
    selectedEstado === "all"
      ? pedidos
      : pedidos.filter(
          (p) => p.estado.toLowerCase() === selectedEstado.toLowerCase()
        );

  return {
    pedidos,
    loading,
    error,
    filteredPedidos,
    selectedEstado,
    setSelectedEstado,
    refetch,
  };
};
