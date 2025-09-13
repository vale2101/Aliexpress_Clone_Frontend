"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, AppWindow } from "lucide-react"; // 👈 añadí AppWindow
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import LocationModal from "../organisms/LocationModal";
import UserMenu from "../molecules/UserMenu";

const IconGroup: React.FC = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const { currency } = useLanguage();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => router.push("/user");
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
        {}
        <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors">
          <AppWindow size={16} className="text-gray-700" />
          <span className="text-xs lg:text-sm text-gray-700 hidden lg:inline">Descarga la app</span>
        </div>

        {}
        <div
          onMouseEnter={() => setShowLocationModal(true)}
          onMouseLeave={() => setShowLocationModal(false)}
          className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition-colors relative"
        >
          {}
          <img
            src="/flags/co.png"
            alt="Colombia"
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm"
          />
          {}
          <div className="hidden sm:flex items-center gap-1">
            <span className="text-xs lg:text-sm text-gray-700">Manizales/ES/</span>
            <span className="text-xs lg:text-sm text-gray-700">{currency}</span>
          </div>
          <span className="text-gray-400 text-xs">▼</span>
          
          {}
          <LocationModal 
            isOpen={showLocationModal} 
            onClose={() => setShowLocationModal(false)}
            onMouseLeave={() => setShowLocationModal(false)}
          />
        </div>

        {}
        <UserMenu onLogin={handleLogin} onLogout={handleLogout} />

        {}
        <div
          onClick={() => console.log("Ir al carrito")}
          className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-orange-500 transition-colors relative"
        >
          <div className="relative">
            <ShoppingCart size={16} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-black text-white text-xs rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center">
              {cartItems}
            </span>
          </div>
          <span className="text-xs lg:text-sm text-gray-700 hidden sm:inline">Cesta</span>
        </div>
      </div>
    </>
  );
};

export default IconGroup;
