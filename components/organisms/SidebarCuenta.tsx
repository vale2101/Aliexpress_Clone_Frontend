"use client";
import React from "react";
import SidebarItem from "../molecules/SidebarItem";
import Text from "../atoms/Typography";

const menuItems = [
  { label: "General", href:"/cuenta" },
  { label: "Pedidos", href: "/pedidos" },
  { label: "Pago", href: "/pago" },
  { label: "Ajustes", href: null },
  { label: "Dirección de envío", href: "/direccion" },
  { label: "Centro de mensajes", href: null },
];

const SidebarCuenta: React.FC = () => {
  return (
    <nav className="bg-white border-r w-64 p-4">
      <div className="mb-6">
        <Text variant="title" className="font-bold text-gray-800">Cuenta</Text>
      </div>
      {menuItems.map((item, index) => (
        <SidebarItem 
          key={index} 
          label={item.label} 
          href={item.href}
        />
      ))}
    </nav>
  );
};

export default SidebarCuenta;
