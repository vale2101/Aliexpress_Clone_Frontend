import React from "react";

interface FormHeaderProps {
  title?: string;
  isLogin?: boolean;
  showProtectionNote?: boolean;
  centered?: boolean;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  isLogin,
  showProtectionNote = false,
  centered = false,
}) => {
  const headingText = title || (isLogin ? "Inicia sesión" : "Regístrate");

  return (
    <div className={`${centered ? "text-center" : ""} mb-8`}>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{headingText}</h1>

      {showProtectionNote && (
        <div className="flex items-center justify-center text-green-600 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Tu información está protegida
        </div>
      )}
    </div>
  );
};

export default FormHeader;