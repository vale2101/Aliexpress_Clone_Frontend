import React from "react";
import HomeLayout from "../../components/layouts/HomeLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informática y Escuela ",
  description:
    "Encuentra todo lo que necesitas para la oficina, el estudio y la informática en un solo lugar. Laptops, accesorios, útiles escolares y más.",
  keywords: ["informática", "escuela", "tecnología", "oficina", "estudio"],
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}

