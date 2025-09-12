import React from "react";

interface SocialButtonProps {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  icon,
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors ${className}`}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm text-gray-700">
        Continuar con {provider}
      </span>
    </button>
  );
};

export default SocialButton;
