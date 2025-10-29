import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis Pedidos | AliExpress Clone",
  description: "Gestiona y revisa todos tus pedidos realizados",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

