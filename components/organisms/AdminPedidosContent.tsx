"use client";
import React from "react";
import Text from "../atoms/Typography";
import { useAuth } from "../../hooks/useAuth";
import { usePedidos } from "../../hooks/usePedidos";
import PedidoFilter from "../molecules/PedidoFilter";
import PedidoList from "../molecules/PedidoList";

const AdminPedidosContent: React.FC = () => {
  const { user } = useAuth();
  const {
    filteredPedidos,
    loading,
    error,
    selectedEstado,
    setSelectedEstado,
  } = usePedidos();

  if (user && user.rol !== 3) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <Text variant="title" className="font-bold text-red-800 mb-2">
            Acceso Denegado
          </Text>
          <Text variant="body" className="text-red-600">
            Solo los vendedores pueden acceder a esta sección.
          </Text>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <Text variant="title" className="font-bold text-yellow-800 mb-2">
            Inicia Sesión
          </Text>
          <Text variant="body" className="text-yellow-600">
            Necesitas iniciar sesión para ver tus pedidos.
          </Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <Text variant="title" className="font-bold text-red-800 mb-2">
            Error
          </Text>
          <Text variant="body" className="text-red-600">
            {error}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Text variant="title" className="font-bold text-gray-900 mb-2">
            Gestión de Pedidos
          </Text>
          <Text variant="body" className="text-gray-600">
            Administra todos los pedidos del sistema
          </Text>
        </div>
      </div>

      <PedidoFilter
        selectedEstado={selectedEstado}
        onEstadoChange={setSelectedEstado}
      />

      <PedidoList pedidos={filteredPedidos} loading={loading} />
    </div>
  );
};

export default AdminPedidosContent;