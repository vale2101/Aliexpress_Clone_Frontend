import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choice | Tu selección especial",
  description:
    "Descubre en Choice una selección exclusiva de productos destacados. Encuentra lo mejor en moda, tecnología, hogar y más, con la mejor relación calidad-precio.",
  keywords: ["choice", "selección", "productos destacados", "exclusivos", "ofertas"],
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

