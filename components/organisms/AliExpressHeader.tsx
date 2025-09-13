"use client";

import React, { useState } from "react";
import { Search, Camera, ChevronDown, User, ShoppingCart, QrCode, MapPin } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../atoms/Logo";

const AliExpressHeader: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white border-b border-gray-200">
      
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y menú hamburguesa */}
          <div className="flex items-center gap-4">
            <Logo />
            <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
              <div className="flex flex-col gap-1">
                <div className="w-4 h-0.5 bg-gray-600"></div>
                <div className="w-4 h-0.5 bg-gray-600"></div>
                <div className="w-4 h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>

          {/* Barra de búsqueda centrada */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="teclas hp victus"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm focus:outline-none"
                />
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Camera className="w-4 h-4" />
                </button>
                <button className="bg-black text-white px-4 py-2 hover:bg-gray-800">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sección derecha */}
          <div className="flex items-center gap-6">
            {/* Descarga la app */}
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <QrCode className="w-4 h-4" />
              <div className="text-center">
                <div>Descarga la app</div>
                <div>de AliExpress</div>
              </div>
            </div>

            {/* Ubicación y moneda */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-4 h-3 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 rounded-sm"></div>
                <div className="text-gray-700">
                  <div className="font-medium">Manizales/ES/</div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">COP</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Usuario */}
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <User className="w-4 h-4" />
              <div>
                <div>¡Bienvenido</div>
                <div>Identifícate / Regístrate</div>
              </div>
            </div>

            {/* Carrito */}
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <div className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </div>
              </div>
              <div>Cesta</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AliExpressHeader;
