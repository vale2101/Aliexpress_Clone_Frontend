import React from "react";

interface PriceProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  discount?: number;
  size?: "sm" | "md" | "lg";
}

const Price: React.FC<PriceProps> = ({ 
  price, 
  originalPrice, 
  currency = "€", 
  discount,
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold text-red-600 ${sizeClasses[size]}`}>
        {currency}{price.toFixed(2)}
      </span>
      {originalPrice && (
        <span className="text-gray-400 line-through text-lg">
          {currency}{originalPrice.toFixed(2)}
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
