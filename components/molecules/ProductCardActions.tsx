import React from "react";
import ActionButton from "../atoms/ActionButton";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardActionsProps {
  onAddToCart?: (e: React.MouseEvent) => void;
}

const ProductCardActions: React.FC<ProductCardActionsProps> = ({ onAddToCart }) => {
  return (
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex flex-col gap-1">
        <ActionButton icon={Heart} />
        <ActionButton icon={ShoppingCart} onClick={onAddToCart} />
      </div>
    </div>
  );
};

export default ProductCardActions;


