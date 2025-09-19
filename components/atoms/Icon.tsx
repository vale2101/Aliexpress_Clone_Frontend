import React from "react";
import { LucideIcon } from "lucide-react";

interface IconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Icon: React.FC<IconProps> = ({ 
  icon: IconComponent, 
  size = "md", 
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <IconComponent className={`${sizeClasses[size]} ${className}`} />
  );
};

export default Icon;
