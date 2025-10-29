import React from "react";

interface PriceDisplayProps {
  precio: number;
  precio_original?: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ precio, precio_original }) => (
  <div>
    <div className="text-sm text-gray-900 font-medium">${precio}</div>
    {precio_original && (
      <div className="text-xs text-gray-500 line-through">${precio_original}</div>
    )}
  </div>
);

export default PriceDisplay;
