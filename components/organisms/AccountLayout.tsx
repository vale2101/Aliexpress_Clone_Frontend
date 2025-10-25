"use client";
import React from "react";
import Breadcrumb from "../molecules/Breadcrumb";
import SidebarCuenta from "./SidebarCuenta";
import UserResumenSection from "./UserResumenSection";
import HelpWidget from "../molecules/HelpWidget";

interface AccountLayoutProps {
  breadcrumbItems: Array<{ label: string; href?: string }>;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ breadcrumbItems }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex">
        <SidebarCuenta />
        
        <div className="flex-1 p-6">
          <UserResumenSection />
        </div>
      </div>
      
      <HelpWidget />
    </div>
  );
};

export default AccountLayout;
