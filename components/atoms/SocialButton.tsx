import React from 'react';

interface SocialButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  className?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  onClick,
  icon,
  text,
  className = "w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors duration-200"
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      <div className="w-5 h-5 mr-3">
        {icon}
      </div>
      {text}
    </button>
  );
};

export default SocialButton;
