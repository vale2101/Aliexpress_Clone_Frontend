"use client";
import React from "react";
import UserInfoCard from "../molecules/UserInfoCard";
import AuthStatus from "../molecules/AuthStatus";
import TokenInfo from "../molecules/TokenInfo";
import OrdersSection from "../molecules/OrdersSection";
import AccountActions from "../molecules/AccountActions";
import RecommendationsSection from "../molecules/RecommendationsSection";

const UserResumenSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <AuthStatus />
      <UserInfoCard />
      <TokenInfo />
      <OrdersSection />
      <AccountActions />
      <RecommendationsSection />
    </div>
  );
};

export default UserResumenSection;
