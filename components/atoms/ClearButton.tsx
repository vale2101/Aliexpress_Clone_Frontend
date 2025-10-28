import React from "react";
import { X } from "lucide-react";

interface ClearButtonProps {
  onClick: () => void;
  className?: string;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors ${className}`}
    >
      <X className="w-4 h-4" />
      Limpiar
    </button>
  );
};

export default ClearButton;

