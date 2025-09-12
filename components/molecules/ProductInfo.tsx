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
      <h1 className="text-2xl font-bold text-gray-900 leading-tight">
        {title}
      </h1>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <Badge key={index} text={badge} />
          ))}
        </div>
      )}

      {/* Rating y ventas */}
      {(rating || soldCount) && (
        <div className="flex items-center gap-4">
          {rating && (
            <Rating rating={rating} reviewCount={reviewCount} />
          )}
          {soldCount && (
            <span className="text-sm text-gray-600">
              {soldCount} vendidos
            </span>
          )}
        </div>
      )}

      {/* Precio */}
      <Price
        price={price}
        originalPrice={originalPrice}
        currency={currency}
        discount={discount}
        size="lg"
      />

      {/* Tienda */}
      {storeName && (
        <div className="text-sm text-gray-600">
          Vendido por: <span className="font-medium text-orange-600">{storeName}</span>
        </div>
      )}

      {/* Descripción corta */}
      {description && (
        <div className="text-gray-700 leading-relaxed">
          {description}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
