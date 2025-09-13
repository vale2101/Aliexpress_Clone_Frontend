import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AliExpress Business | Compras al por mayor",
  description:
    "AliExpress Business te ofrece precios exclusivos y beneficios para compras al por mayor. Encuentra proveedores confiables y haz crecer tu negocio con productos de calidad.",
  keywords: [
    "aliexpress business",
    "compras al por mayor",
    "proveedores",
    "negocios",
    "emprendedores",
    "distribución",
  ],
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

