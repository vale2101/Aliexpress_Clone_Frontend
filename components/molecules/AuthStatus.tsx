import React from "react";
import Text from "../atoms/Typography";
import { useAuth } from "../../contexts/AuthContext";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const AuthStatus: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center gap-2">
        <Loader className="w-4 h-4 animate-spin text-blue-600" />
        <Text variant="body" className="text-blue-800">Verificando autenticación...</Text>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex items-center gap-2">
        <XCircle className="w-4 h-4 text-red-600" />
        <Text variant="body" className="text-red-800">No autenticado</Text>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex items-center gap-2">
      <CheckCircle className="w-4 h-4 text-green-600" />
      <Text variant="body" className="text-green-800">
        Autenticado como {user?.nombre} {user?.apellido}
      </Text>
    </div>
  );
};

export default AuthStatus;
