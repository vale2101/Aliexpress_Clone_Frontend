"use client";
import React from "react";
import SidebarItem from "../molecules/SidebarItem";
import Text from "../atoms/Typography";
import { useAuth } from "../../contexts/AuthContext";

const regularMenuItems = [
  { label: "General", href: "/cuenta" },
  { label: "Pedidos", href: "/mis-pedidos" },
  { label: "Pago", href: "/pago" },
  { label: "Ajustes", href: null },
  { label: "Dirección de envío", href: "/direccion" },
  { label: "Centro de mensajes", href: null },
];

const adminMenuItems = [
  { label: "General", href: "/cuenta" },
  { label: "Productos", href: "/cuenta/productos" },
  { label: "Pedidos", href: "/cuenta/pedidos" },
];

const SidebarCuenta: React.FC = () => {
  const { user } = useAuth();
  
  // Check if user has admin role (role id 1)
  const isAdmin = user && user.rol === "1";
  
  // Use appropriate menu based on role
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
