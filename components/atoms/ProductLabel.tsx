import React from "react";

interface ProductLabelProps {
  label: string;
  variant?: "blue" | "yellow" | "green";
  position?: "top-left" | "bottom-left";
}

const ProductLabel: React.FC<ProductLabelProps> = ({ 
  label, 
  variant = "blue",
  position = "bottom-left"
}) => {
  const variantClasses = {
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-yellow-400 text-black",
    green: "bg-green-100 text-green-800"
  };

  const positionClasses = {
    "top-left": "top-2 left-2",
    "bottom-left": "bottom-2 left-2"
  };

  return (
    <div className={`absolute ${positionClasses[position]} ${variantClasses[variant]} text-xs px-2 py-1 rounded font-semibold`}>
      {label}
    </div>
  );
};

export default ProductLabel;
