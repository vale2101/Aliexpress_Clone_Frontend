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
          className="flex items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors"
        >
          <Smartphone size={20} />
          <span className="text-sm">{t('header.download_app')}</span>
        </div>

        {/* Idioma y moneda */}
        <div 
          onClick={handleLocationClick}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors"
        >
          <Globe size={20} />
          <span className="text-sm">{language.toUpperCase()} | {currency}</span>
        </div>

        {/* Login / Registro */}
        <div 
          onClick={handleLogin}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors"
        >
          <User size={20} />
          <span className="text-sm">{t('header.login')}</span>
        </div>

        {/* Carrito */}
        <div 
          onClick={handleCart}
          className="flex items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors relative"
        >
          <div className="relative">
            <ShoppingCart size={20} />
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </div>
          <span className="text-sm">{t('header.cart')}</span>
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
