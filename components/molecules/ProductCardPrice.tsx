import React from "react";
import Price from "../atoms/Price";

interface ProductCardPriceProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  savings?: string;
}

const ProductCardPrice: React.FC<ProductCardPriceProps> = ({ price, originalPrice, currency = "$", savings }) => {
  return (
    <div className="space-y-1">
      <Price 
        price={price}
        originalPrice={originalPrice}
        currency={currency}
        size="sm"
      />
      {savings && (
        <p className="text-xs text-green-600 font-medium">{savings}</p>
      )}
    </div>
  );
};

export default ProductCardPrice;


