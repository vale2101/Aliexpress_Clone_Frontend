import React from 'react';
import Input from './Input';

interface FormFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
  className = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
}) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
    />
  );
};

export default FormField;
