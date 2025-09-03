import React from "react";
import { Globe, ShoppingCart, User, Smartphone } from "lucide-react";

const IconGroup: React.FC = () => {
  return (
    <div className="flex items-center gap-6">
      {/* Descargar App */}
      <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
        <Smartphone size={20} />
        <span className="text-sm">Descargar App</span>
      </div>

      {/* Idioma y moneda */}
      <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
        <Globe size={20} />
        <span className="text-sm">Español | COP</span>
      </div>

      {/* Login / Registro */}
      <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
        <User size={20} />
        <span className="text-sm">Ingresar</span>
      </div>

      {/* Carrito */}
      <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
        <ShoppingCart size={20} />
        <span className="text-sm">Carrito</span>
      </div>
    </div>
  );
};

export default IconGroup;
