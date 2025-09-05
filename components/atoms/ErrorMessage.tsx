import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  className = "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg" 
}) => {
  if (!message) return null;
  
  return (
    <div className={className}>
      {message}
    </div>
  );
};

export default ErrorMessage;
