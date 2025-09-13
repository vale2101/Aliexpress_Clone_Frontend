import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telefonía y Comunicación | AliExpress",
  description:
    "Descubre lo último en telefonía y comunicación: smartphones, accesorios, auriculares, dispositivos inteligentes y más. Conéctate siempre con estilo y la mejor tecnología.",
  keywords: [
    "telefonía",
    "comunicación",
    "smartphones",
    "celulares",
    "accesorios móviles",
    "auriculares",
    "tecnología",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

