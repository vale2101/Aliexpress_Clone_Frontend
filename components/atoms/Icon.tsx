import React from "react";
import { LucideIcon } from "lucide-react";

interface IconProps {
  Icon: LucideIcon;
}

const Icon: React.FC<IconProps> = ({ Icon }) => {
  return (
    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
      <Icon className="w-6 h-6" />
    </button>
  );
};

export default Icon;
