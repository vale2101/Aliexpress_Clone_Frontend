import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
