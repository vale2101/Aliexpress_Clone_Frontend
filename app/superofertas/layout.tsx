import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Superofertas | Descuentos únicos",
  description:
    "Aprovecha las mejores superofertas en moda, tecnología, hogar y más. Descuentos exclusivos por tiempo limitado para que compres al mejor precio.",
  keywords: ["superofertas", "descuentos", "promociones", "rebajas", "ahorros"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

