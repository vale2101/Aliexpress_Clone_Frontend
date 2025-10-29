import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pack Ofertas | AliExpress",
  description:
    "Aprovecha los mejores Pack Ofertas en AliExpress: combina productos y ahorra más. Descuentos exclusivos en moda, tecnología, hogar y mucho más.",
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

