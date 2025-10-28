import React from "react";
import Text from "../atoms/Typography";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../../hooks/useAuth";

const TokenInfo: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg mb-6">
        <Text variant="body">Cargando información del usuario...</Text>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <Text variant="body" className="text-yellow-800">
          No estás autenticado. Por favor, inicia sesión.
        </Text>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-3">
        <Text variant="title" className="font-bold">Información de Sesión</Text>
        <LogoutButton />
      </div>
      <div className="space-y-2">
        {user?.telefono ? (
          <div className="flex justify-between">
            <Text variant="body" className="text-gray-600">Teléfono:</Text>
            <Text variant="body" className="font-medium">{user.telefono}</Text>
          </div>
        ) : (
          <div className="flex justify-between">
            <Text variant="body" className="text-gray-600">Teléfono:</Text>
            <Text variant="body" className="text-gray-400">No registrado</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenInfo;
