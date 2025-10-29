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
      console.log("Making API call to:", `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"}/api/pedidoV/vendedor/${idVendedor}`);
      const data = await PedidoVService.getPedidosPorVendedor(idVendedor);
      console.log("Received data:", data);
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
    console.log("usePedidos - User:", user);
    console.log("usePedidos - User role:", user?.rol);
    console.log("usePedidos - User ID:", user?.id_usuario);
    
    if (user?.rol === 3 && user.id_usuario) {
      console.log("Loading pedidos for vendor:", user.id_usuario);
      loadPedidos(user.id_usuario);
    } else {
      console.log("Not loading pedidos - user role:", user?.rol, "user ID:", user?.id_usuario);
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
