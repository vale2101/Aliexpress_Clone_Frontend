import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => (
  <img
    src={src || "/placeholder.jpg"}
    alt={alt}
    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
  />
);

export default ProductImage;
