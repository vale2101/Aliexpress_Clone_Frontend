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
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <SidebarCuenta />
        
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <UserResumenSection />
        </div>
      </div>
      
      {/* Help Widget */}
      <HelpWidget />
    </div>
  );
};

export default AccountLayout;
