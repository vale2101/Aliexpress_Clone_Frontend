import { useState, useEffect } from "react";
import { Pedido } from "../interfaces/pedido.interface";
import { pedidoService } from "../services/pedidoService";
import { useAuth } from "./useAuth";

interface UsePedidoReturn {
  pedido: Pedido | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook para obtener un pedido específico del usuario autenticado
 */
export const usePedido = (pedidoId: number): UsePedidoReturn => {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPedido = async () => {
      if (!user || !isAuthenticated) {
        setLoading(false);
        setError("Usuario no autenticado");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const pedidos = await pedidoService.getByUser(user.id_usuario);
        const pedidoEncontrado = pedidos.find(p => p.id_pedido === pedidoId);
        
        if (pedidoEncontrado) {
          setPedido(pedidoEncontrado);
        } else {
          setError("Pedido no encontrado");
        }
      } catch (err) {
        console.error("Error al obtener pedido:", err);
        setError("Error al cargar el pedido");
      } finally {
        setLoading(false);
      }
    };

    fetchPedido();
  }, [pedidoId, user, isAuthenticated]);

  return { pedido, loading, error };
};

