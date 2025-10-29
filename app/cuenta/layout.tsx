import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendedor | Cuenta",
  description: "Gestiona tu cuenta de vendedor en nuestra plataforma.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

