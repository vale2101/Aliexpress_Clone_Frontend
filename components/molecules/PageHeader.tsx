import React from "react";
import Text from "../atoms/Typography";

interface PageHeaderProps {
  title: string;
  description?: string;
  titleColor?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, titleColor = "text-gray-800" }) => {
  return (
    <div className="text-center mb-8">
      <Text variant="title" className={`text-4xl font-bold ${titleColor} mb-4`}>
        {title}
      </Text>
      {description && (
        <Text variant="body" className="text-gray-600">
          {description}
        </Text>
      )}
    </div>
  );
};

export default PageHeader;

