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
      <div className="flex items-center gap-6">
        {/* 🔹 Descargar app */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors">
          <AppWindow size={18} className="text-gray-700" />
          <span className="text-sm text-gray-700">Descarga la app de AliExpress</span>
        </div>

        {/* 🔹 Idioma y moneda */}
        <div
          onClick={() => setShowLocationModal(true)}
          className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors"
        >
          {/* Aquí puedes poner bandera */}
          <img
            src="/flags/co.png"
            alt="Colombia"
            className="w-5 h-5 rounded-sm"
          />
          <span className="text-sm text-gray-700">Manizales/ES/</span>
          <span className="text-sm text-gray-700">{currency}</span>
          <span className="text-gray-400 text-xs">▼</span>
        </div>

        {/* 🔹 Menú Usuario */}
        <UserMenu onLogin={handleLogin} onLogout={handleLogout} />

        {/* 🔹 Carrito */}
        <div
          onClick={() => console.log("Ir al carrito")}
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

      <LocationModal isOpen={showLocationModal} onClose={() => setShowLocationModal(false)} />
    </>
  );
};

export default IconGroup;
