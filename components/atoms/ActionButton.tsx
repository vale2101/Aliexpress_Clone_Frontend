import React from "react";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon: Icon, 
  onClick, 
  className = "" 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors ${className}`}
    >
      <Icon className="w-4 h-4 text-gray-600" />
    </button>
  );
};

export default ActionButton;
