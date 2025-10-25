import React from "react";
import Link from "next/link";
import Icon from "../atoms/Icon";

interface MenuItemProps {
  icon: any; // LucideIcon
  label: string;
  href: string;
  active?: boolean; // Para resaltar el ítem seleccionado
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, href, active = false }) => {
  return (
    <Link href={href}>
      <div
        className={`
          flex items-center gap-3 px-4 py-2 cursor-pointer transition
          ${active ? "text-red-600 border-l-4 border-red-600 bg-red-50" : "text-gray-700 hover:bg-gray-50"}
        `}
      >
        <Icon icon={icon} size="md" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default MenuItem;
