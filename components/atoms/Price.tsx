import React from "react";

interface PriceProps {
  price: number | string;
  originalPrice?: number | string;
  currency?: string;
  discount?: number;
  size?: "sm" | "md" | "lg";
}

const Price: React.FC<PriceProps> = ({ 
  price, 
  originalPrice, 
  currency = "$", 
  discount,
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  const numericPrice = typeof price === 'number' ? price : parseFloat(price?.toString() || '0');
  const numericOriginalPrice = originalPrice ? 
    (typeof originalPrice === 'number' ? originalPrice : parseFloat(originalPrice.toString())) : 
    undefined;

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'COP') {
      return `COP${price.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
    }
    return `${currency}${price.toFixed(2)}`;
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold text-red-600 ${sizeClasses[size]}`}>
        {formatPrice(numericPrice, currency)}
      </span>
      {numericOriginalPrice && (
        <span className="text-gray-400 line-through text-lg">
          {formatPrice(numericOriginalPrice, currency)}
        </span>
      )}
      {discount && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{discount}%
        </span>
      )}
    </div>
  );
};

export default Price;
