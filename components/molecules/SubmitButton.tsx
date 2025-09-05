import React from 'react';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';

interface SubmitButtonProps {
  isLogin: boolean;
  isLoading: boolean;
  disabled?: boolean;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLogin,
  isLoading,
  disabled = false,
  className = "w-full bg-pink-400 hover:bg-pink-500 disabled:bg-pink-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors"
}) => {
  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className={className}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner size="md" className="mr-3" />
          {isLogin ? "Iniciando sesión..." : "Registrando..."}
        </div>
      ) : (
        isLogin ? "Iniciar sesión" : "Registrarse"
      )}
    </Button>
  );
};

export default SubmitButton;
