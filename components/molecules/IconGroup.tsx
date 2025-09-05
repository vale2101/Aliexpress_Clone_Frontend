"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, ShoppingCart, User, Smartphone } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import LocationModal from "../organisms/LocationModal";

const IconGroup: React.FC = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const { t, language, currency, country } = useLanguage();
  const router = useRouter();

  const handleAppDownload = () => {
    // Funcionalidad para descargar app
    console.log("Descargar app");
  };

  const handleLogin = () => {
    router.push("/user");
  };

  const handleCart = () => {
    // Funcionalidad del carrito
    console.log("Ir al carrito");
  };

  const handleLocationClick = () => {
    setShowLocationModal(true);
  };

  return (
    <>
      <div className="flex items-center gap-6">
        {/* Descargar App */}
        <div 
          onClick={handleAppDownload}
          className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors"
        >
          <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1 h-1 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-sm"></div>
              <div className="w-1 h-1 bg-white rounded-sm"></div>
            </div>
          </div>
          <span className="text-sm text-gray-700">Descarga la app de AliExpress</span>
        </div>

        {/* Idioma y moneda */}
        <div 
          onClick={handleLocationClick}
          className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors"
        >
          <div className="w-4 h-3 bg-gradient-to-b from-yellow-400 via-blue-500 to-red-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">🇨🇴</span>
          </div>
          <span className="text-sm text-gray-700">Manizales/ES/</span>
          <span className="text-sm text-gray-700">{currency}</span>
          <span className="text-gray-400 text-xs">▼</span>
        </div>

        {/* Login / Registro */}
        <div 
          onClick={handleLogin}
          className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors"
        >
          <User size={18} className="text-gray-600" />
          <span className="text-sm text-gray-700">¡Bienvenido Identifícate / Regístrate</span>
        </div>

        {/* Carrito */}
        <div 
          onClick={handleCart}
          className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors relative"
        >
          <div className="relative">
            <ShoppingCart size={18} className="text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-xs">
              {cartItems}
            </span>
          </div>
          <span className="text-sm text-gray-700">Cesta</span>
        </div>
      </div>

      {/* Modal de configuración */}
      <LocationModal 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)} 
      />
    </>
  );
};

export default IconGroup;
