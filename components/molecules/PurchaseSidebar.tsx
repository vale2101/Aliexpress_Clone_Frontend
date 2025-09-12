"use client";

import React, { useState } from "react";
import { MapPin, ChevronRight, Heart, Share2, MessageCircle, Shield, Clock, Truck } from "lucide-react";
import Button from "../atoms/Button";
import QuantitySelector from "../atoms/QuantitySelector";

interface PurchaseSidebarProps {
  productId: number;
  price: number | string;
  currency?: string;
  onAddToCart: (productId: number, quantity: number) => void;
  onAddToWishlist: (productId: number) => void;
  onShare: (productId: number) => void;
  onContact: (productId: number) => void;
}

const PurchaseSidebar: React.FC<PurchaseSidebarProps> = ({
  productId,
  price,
  currency = "€",
  onAddToCart,
  onAddToWishlist,
  onShare,
  onContact,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(productId, quantity);
  };

  const handleAddToWishlist = () => {
    onAddToWishlist(productId);
  };

  const handleShare = () => {
    onShare(productId);
  };

  const handleContact = () => {
    onContact(productId);
  };

  return (
    <div className="space-y-6">
      {/* Información del vendedor */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Vendido por</span>
          <button className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700">
            <span>Shop1103743899 Store (Vendedor)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Envío a</span>
          <span className="font-medium">Manizales, Caldas, Colombia</span>
        </div>
      </div>

      {/* Choice Compromiso de AliExpress */}
      <div className="border border-gray-200 rounded-lg p-4 space-y-3">
        <h3 className="font-medium text-gray-900">Choice Compromiso de AliExpress</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Envío</span>
            <span className="font-medium">COP11.882,18</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Entrega</span>
            <span className="font-medium">26 de SEP. - 03 de OCT.</span>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Entrega rápida</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Cupón por entrega tardía</li>
            <li>• Reembolso si se pierde el paquete</li>
            <li>• Reembolso si el artículo está dañado</li>
            <li>• Reembolso si no se entrega en 60 días</li>
          </ul>
        </div>

        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
          <span>Política de devoluciones y reembolsos</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Seguridad y Privacidad */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Seguridad & Privacidad
        </h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p>Pagos seguros: No compartiremos tus datos personal...</p>
          <p>Datos personales seguros: Protegemos tu privacidad...</p>
        </div>
      </div>

      {/* Selector de cantidad */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-gray-700">Cantidad:</span>
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={99}
        />
        <div className="text-sm text-gray-600">18 disponible(s)</div>
      </div>

      {/* Botones de acción */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold"
        >
          Comprar
        </Button>

        <Button
          onClick={handleAddToCart}
          variant="ghost"
          className="w-full border border-gray-300 hover:bg-gray-50 py-3"
        >
          Agregar al carrito
        </Button>
      </div>

      {/* Acciones sociales */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <Share2 className="w-4 h-4" />
          Compartir
        </button>
        
        <button
          onClick={handleAddToWishlist}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <Heart className="w-4 h-4" />
          <span>4696</span>
        </button>
      </div>
    </div>
  );
};

export default PurchaseSidebar;
