import React from "react";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  sold?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  oldPrice,
  discount,
  rating,
  sold,
}) => {
  return (
    <div className="w-44 flex flex-col hover:shadow-md transition p-2 rounded-lg border bg-white">
      <img
        src={image}
        alt={title}
        className="rounded-lg mb-2 w-full h-40 object-cover"
      />
      <p className="text-sm text-gray-700 truncate">{title}</p>
      <p className="text-lg font-bold text-red-600">{price}</p>

      {oldPrice && (
        <p className="text-sm line-through text-gray-400">{oldPrice}</p>
      )}

      {discount && (
        <p className="text-xs text-white bg-red-500 px-2 py-0.5 rounded w-fit mt-1">
          {discount}
        </p>
      )}

      {rating && (
        <p className="text-xs text-yellow-500 mt-1">
          ⭐ {rating} {sold && `• ${sold} vendidos`}
        </p>
      )}
    </div>
  );
};

export default ProductCard;
