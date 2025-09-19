"use client";

import React from "react";

export interface MenuItemProps {
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon, danger, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors 
        ${danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50"}`}
    >
      {icon && <span className="text-gray-500">{icon}</span>}
      <span className="text-sm">{label}</span>
    </li>
  );
};

export default MenuItem;
