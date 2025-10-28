"use client";
import React from "react";
import Breadcrumb from "../../components/molecules/Breadcrumb";
import SidebarCuenta from "../../components/organisms/SidebarCuenta";
import MisPedidosContent from "../../components/organisms/MisPedidosContent";

export default function MisPedidosPage() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Mi cuenta", href: "/cuenta" },
    { label: "Mis pedidos" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex">
        <SidebarCuenta />
        
        <div className="flex-1 p-6">
          <MisPedidosContent />
        </div>
      </div>
    </div>
  );
}
