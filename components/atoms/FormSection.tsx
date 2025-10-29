import React from "react";
import Text from "./Typography";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <Text variant="subtitle" className="font-semibold text-gray-900 mb-4">
      {title}
    </Text>
    {children}
  </div>
);

export default FormSection;
