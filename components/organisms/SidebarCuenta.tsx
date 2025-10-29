"use client";
import React from "react";
import SidebarItem from "../molecules/SidebarItem";
import Text from "../atoms/Typography";
import { useAuth } from "../../hooks/useAuth";

const regularMenuItems = [
  { label: "General", href: "/cuenta" },
  { label: "Pedidos", href: "/mis-pedidos" },
  { label: "Dirección de envío", href: "/direccion" },
];

const adminMenuItems = [
  { label: "General", href: "/cuenta" },
  { label: "Productos", href: "/cuenta/productos" },
  { label: "Pedidos", href: "/cuenta/pedidos" },
];

const SidebarCuenta: React.FC = () => {
  const { user } = useAuth();

  const isAdmin = user && Number(user.rol) === 3;

  const menuItems = isAdmin ? adminMenuItems : regularMenuItems;

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