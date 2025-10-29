import React from "react";

interface StockDisplayProps {
  stock: number;
}

const StockDisplay: React.FC<StockDisplayProps> = ({ stock }) => (
  <div className="text-sm text-gray-900">{stock} unidades</div>
);

export default StockDisplay;
