import React from "react";
import PageHeader from "../molecules/PageHeader";
import FeaturedProducts from "./FeaturedProducts";
import RecommendationsSection from "./RecommendationsSection";

interface CategoryPageContentProps {
  title: string;
  description?: string;
  titleColor?: string;
  category?: string[];
}

const CategoryPageContent: React.FC<CategoryPageContentProps> = ({
  title,
  description,
  titleColor = "text-gray-800",
  category
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PageHeader title={title} description={description} titleColor={titleColor} />
        
        <FeaturedProducts categories={category} />
        
        <RecommendationsSection />
      </div>
    </div>
  );
};

export default CategoryPageContent;

