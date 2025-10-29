import React from "react";

interface ProductCardInfoProps {
  title: string;
  store?: string;
  features?: string[];
}

const ProductCardInfo: React.FC<ProductCardInfoProps> = ({ title, store, features }) => {
  return (
    <>
      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
        {title}
      </h3>

      {store && (
        <p className="text-xs text-gray-500 mb-1">{store}</p>
      )}

      {features && features.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {features.map((feature, index) => (
            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {feature}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductCardInfo;


