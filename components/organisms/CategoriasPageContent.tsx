import React from "react";
import PageHeader from "../molecules/PageHeader";
import CategoriesGrid from "./CategoriesGrid";
import RecommendationsSection from "./RecommendationsSection";

interface CategoriasPageContentProps {
  title: string;
  description?: string;
}

const CategoriasPageContent: React.FC<CategoriasPageContentProps> = ({
  title,
  description
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PageHeader title={title} description={description} />
        
        <CategoriesGrid />
        
        <RecommendationsSection />
      </div>
    </div>
  );
};

export default CategoriasPageContent;

