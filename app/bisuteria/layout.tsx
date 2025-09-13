import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bisutería y Relojes | Mi Tienda",
  description:
    "Descubre joyas, bisutería y relojes únicos para cada ocasión. Encuentra el accesorio perfecto con estilo y elegancia.",
  keywords: ["bisutería", "joyas", "relojes", "accesorios", "moda"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

