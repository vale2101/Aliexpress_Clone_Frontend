"use client";
import React from "react";
import CategoryPageContent from "../../components/organisms/CategoryPageContent";

export default function InformaticaPage() {
  return (
    <CategoryPageContent
      title="Informática y escuela"
      description="Todo lo que necesitas para la oficina y el estudio."
      titleColor="text-gray-800"
      category={["Informática", "Escuela"]}
    />
  );
}
