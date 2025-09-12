import React from "react";

interface DiscountBadgeProps {
  discount: string;
  position?: "top-left" | "top-right";
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ 
  discount, 
  position = "top-left" 
}) => {
  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2"
  };

  return (
    <div className={`absolute ${positionClasses[position]} bg-red-500 text-white text-xs px-2 py-1 rounded`}>
      {discount}
    </div>
  );
};

export default DiscountBadge;
