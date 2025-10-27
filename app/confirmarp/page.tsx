"use client";

import React from "react";
import CheckoutLayout from "../../components/organisms/CheckoutLayout";
import { useCheckout } from "../../hooks/useCheckout";

const ConfirmarPedidoPage: React.FC = () => {
  const {
    items,
    handleQuantityChange,
    handlePlaceOrder,
    handleAddMoreItems,
    isCartEmpty,
  } = useCheckout();

  // Redirigir si el carrito está vacío
  if (isCartEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-gray-600 mb-6">
            Agrega algunos productos antes de continuar con el checkout
          </p>
          <button
            onClick={handleAddMoreItems}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Ir a comprar
          </button>
        </div>
      </div>
    );
  }

  return (
    <CheckoutLayout
      items={items}
      onPlaceOrder={handlePlaceOrder}
      onQuantityChange={handleQuantityChange}
      onAddMoreItems={handleAddMoreItems}
    />
  );
};

export default ConfirmarPedidoPage;

