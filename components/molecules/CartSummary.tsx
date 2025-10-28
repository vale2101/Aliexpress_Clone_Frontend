import React from "react";
import Text from "../atoms/Typography";
import Button from "../atoms/Button";

interface CartSummaryProps {
  totalPrice: number;
  totalItems: number;
  onContinue: () => void;
  onClearCart: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalPrice,
  totalItems,
  onContinue,
  onClearCart
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm sticky top-8 p-6 space-y-6">
      <Text variant="title" className="text-xl font-bold text-gray-900">
        Resumen
      </Text>
      <div className="flex justify-between items-center">
        <Text variant="body" className="text-gray-700">
          Estimación total
        </Text>
        <Text variant="title" className="text-xl font-bold text-gray-900">
          ${totalPrice.toFixed(2)}
        </Text>
      </div>
      <Button
        onClick={onContinue}
        className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        Continuar ({totalItems})
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </Button>
      {totalItems > 0 && (
        <Button
          onClick={onClearCart}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          🗑 Limpiar carrito
        </Button>
      )}
    </div>
  );
};

export default CartSummary;

