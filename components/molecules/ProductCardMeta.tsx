import React from "react";
import Rating from "../atoms/Rating";

interface ProductCardMetaProps {
  rating?: number;
  sold?: string;
}

const ProductCardMeta: React.FC<ProductCardMetaProps> = ({ rating, sold }) => {
  if (!rating) return null;
  return (
    <div className="flex items-center justify-between mt-2">
      <Rating rating={rating} />
      {sold && (
        <span className="text-xs text-gray-500">{sold} vendidos</span>
      )}
    </div>
  );
};

export default ProductCardMeta;


