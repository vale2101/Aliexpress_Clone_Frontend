import React from "react";
import Button from "../atoms/Button";
import { useAuth } from "../../hooks/useAuth";
import { LogOut } from "lucide-react";

const LogoutButton: React.FC = () => {
  const { logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
    >
      <LogOut size={16} />
      {loading ? "Cerrando sesión..." : "Cerrar Sesión"}
    </Button>
  );
};

export default LogoutButton;
