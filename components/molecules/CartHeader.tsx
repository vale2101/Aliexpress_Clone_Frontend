import React from "react";
import Text from "../atoms/Typography";
import Button from "../atoms/Button";

interface CartHeaderProps {
  itemCount: number;
  onClearCart: () => void;
}

const CartHeader: React.FC<CartHeaderProps> = ({ itemCount, onClearCart }) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <Text variant="title" className="font-bold text-gray-900">
        Cesta
      </Text>
      {itemCount > 0 && (
        <Button
          onClick={onClearCart}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-2"
        >
          🗑 Limpiar carrito
        </Button>
      )}
    </div>
  );
};

export default CartHeader;

