import React from "react";
import DiscountBadge from "../atoms/DiscountBadge";
import ProductLabel from "../atoms/ProductLabel";

interface ProductCardImageProps {
  src: string;
  alt: string;
  discount?: string;
  label?: string;
}

const ProductCardImage: React.FC<ProductCardImageProps> = ({ src, alt, discount, label }) => {
  return (
    <div className="relative aspect-square overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {discount && (
        <DiscountBadge discount={discount} />
      )}

      {label && (
        <ProductLabel label={label} />
      )}
    </div>
  );
};

export default ProductCardImage;


