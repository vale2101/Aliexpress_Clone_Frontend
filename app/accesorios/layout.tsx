import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accesorios | AliExpress",
  description:
    "Encuentra los mejores accesorios para complementar tu estilo y tu tecnología. Desde fundas, cargadores y audífonos hasta relojes, joyería y más, todo en un solo lugar.",
  keywords: [
    "accesorios",
    "moda",
    "joyería",
    "relojes",
    "cargadores",
    "fundas",
    "audífonos",
    "complementos",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

