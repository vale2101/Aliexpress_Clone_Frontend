import React from "react";
import Price from "../atoms/Price";
import Rating from "../atoms/Rating";
import Badge from "../atoms/Badge";

interface ProductInfoProps {
  title: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  storeName?: string;
  badges?: string[];
  description?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  price,
  originalPrice,
  currency = "€",
  discount,
  rating,
  reviewCount,
  soldCount,
  storeName,
  badges = [],
  description,
}) => {
  return (
    <div className="space-y-4">
      {/* Título */}
      <h1 className="text-xl font-medium text-gray-900 leading-tight">
        {title}
      </h1>

      {/* Rating y ventas */}
      {(rating || soldCount) && (
        <div className="flex items-center gap-4">
          {rating && (
            <Rating rating={rating} reviewCount={reviewCount} />
          )}
          {soldCount && (
            <span className="text-sm text-gray-600">
              {soldCount} vendido(s)
            </span>
          )}
        </div>
      )}

      {/* Tienda */}
      {storeName && (
        <div className="text-sm text-gray-600">
          De <span className="font-medium text-orange-600">{storeName}</span>
        </div>
      )}

      {/* Badge SuperOfertas */}
      {badges.length > 0 && (
        <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          SuperOfertas
        </div>
      )}

      {/* Precio */}
      <div className="space-y-2">
        <Price
          price={price}
          originalPrice={originalPrice}
          currency={currency}
          discount={discount}
          size="lg"
        />
        
        {/* Stock limitado */}
        <div className="text-red-600 text-sm font-medium">
          Solo quedan 18
        </div>
      </div>

      {/* Selector de color/variante */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-700">
          Color: Gold-BIRTHDAY
        </div>
        </div>
      </div>
  );
};

export default ProductInfo;
