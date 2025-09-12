import React from "react";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  className = "" 
}) => {
  if (!message) return null;

  return (
    <div className={`bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm ${className}`}>
      {message}
    </div>
  );
};

export default ErrorMessage;
