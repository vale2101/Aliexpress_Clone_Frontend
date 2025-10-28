"use client";
import React from "react";
import Breadcrumb from "../../../components/molecules/Breadcrumb";
import SidebarCuenta from "../../../components/organisms/SidebarCuenta";
import AdminPedidosContent from "../../../components/organisms/AdminPedidosContent";

export default function PedidosPage() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Cuenta", href: "/cuenta" },
    { label: "Pedidos" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex">
        <SidebarCuenta />
        
        <div className="flex-1 p-6">
          <AdminPedidosContent />
        </div>
      </div>
    </div>
  );
}

