"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { pedidoService } from "../../services/pedidoService";
import { Pedido } from "../../interfaces/pedido.interface";
import PedidoCard from "../molecules/PedidoCard";
import PedidosEmptyState from "../molecules/PedidosEmptyState";
import PedidosLoadingState from "../molecules/PedidosLoadingState";
import PedidosListHeader from "../molecules/PedidosListHeader";

const MisPedidosContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!user || !isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const pedidosData = await pedidoService.getByUser(user.id_usuario);
        setPedidos(pedidosData);
      } catch (error) {
        console.error("Error al obtener pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [user, isAuthenticated]);

  if (loading) return <PedidosLoadingState />;

  if (!isAuthenticated || !user) {
    return (
      <PedidosEmptyState
        title="Inicia sesión para ver tus pedidos"
        message="Necesitas estar autenticado para acceder a tus pedidos"
        buttonText="Iniciar sesión"
        buttonLink="/user"
      />
    );
  }

  if (pedidos.length === 0) {
    return (
      <PedidosEmptyState
        title="No tienes pedidos"
        message="Cuando realices tu primera compra, aparecerá aquí"
        buttonText="Comenzar a comprar"
        buttonLink="/"
      />
    );
  }

  return (
    <>
      <PedidosListHeader
        title="Mis Pedidos"
        subtitle="Revisa el estado de todos tus pedidos"
      />
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <PedidoCard key={pedido.id_pedido} pedido={pedido} />
        ))}
      </div>
    </>
  );
};

export default MisPedidosContent;