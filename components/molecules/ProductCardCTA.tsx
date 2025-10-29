import React from "react";

interface ProductCardCTAProps {
  label?: string;
}

const ProductCardCTA: React.FC<ProductCardCTAProps> = ({ label }) => {
  if (!label) return null;
  return (
    <button className="w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded mt-2 transition-colors">
      {label}
    </button>
  );
};

export default ProductCardCTA;


