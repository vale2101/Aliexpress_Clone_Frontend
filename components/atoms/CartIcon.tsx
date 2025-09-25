import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

interface CartIconProps {
  className?: string;
  showCount?: boolean;
  onClick?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ 
  className = "",
  showCount = true,
  onClick
}) => {
  const { totalItems } = useCartStore();

  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      aria-label={`Carrito de compras con ${totalItems} artículos`}
    >
      <ShoppingCart className="w-6 h-6" />
      
      {showCount && totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
