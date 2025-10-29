import React from "react";
import Text from "./Typography";
import Input from "./Input";
import Select from "./Select";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, required = false, error, children }) => (
  <div>
    <Text variant="small" className="text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </Text>
    {children}
    {error && (
      <Text variant="small" className="text-red-500 mt-1">{error}</Text>
    )}
  </div>
);

export default FormField;