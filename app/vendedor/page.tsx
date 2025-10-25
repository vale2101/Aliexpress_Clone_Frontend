import React from "react";
import VendedorLogin from "../../components/organisms/VendedorLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centro de Ventas Global | AliExpress",
  description: "Accede al panel de vendedores y gestiona tus ventas globales.",
};

export default function Page() {
  return <VendedorLogin />;
}
