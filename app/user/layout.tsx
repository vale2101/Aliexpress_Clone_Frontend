import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AliExpress - Compra online de Electrónica, Moda, Hogar y más",
  description:
    "Descubre millones de productos en AliExpress: moda, electrónica, hogar, belleza, deportes y mucho más. Disfruta de superofertas, envíos rápidos y precios increíbles en tu tienda online de confianza.",
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
