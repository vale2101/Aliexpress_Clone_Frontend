"use client";
import React from "react";
import AccountLayout from "../../components/organisms/AccountLayout";

export default function Cuenta() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Cuenta" }
  ];

  return <AccountLayout breadcrumbItems={breadcrumbItems} />;
}

