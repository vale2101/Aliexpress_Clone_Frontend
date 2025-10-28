"use client";
import React from "react";
import Breadcrumb from "../../components/molecules/Breadcrumb";
import SidebarCuenta from "../../components/organisms/SidebarCuenta";
import HelpWidget from "../../components/molecules/HelpWidget";
import MisPedidosContent from "../../components/organisms/MisPedidosContent";

const MisPedidosPage: React.FC = () => {
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Cuenta", href: "/cuenta" },
    { label: "Mis pedidos" },
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
      <HelpWidget />
    </div>
  );
};

export default MisPedidosPage;