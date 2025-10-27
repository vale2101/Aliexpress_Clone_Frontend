import React from "react";

interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ 
  children, 
  className = "",
  ...props 
}) => {
  return (
    <button
      className={`text-blue-600 hover:text-blue-800 underline font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default LinkButton;

