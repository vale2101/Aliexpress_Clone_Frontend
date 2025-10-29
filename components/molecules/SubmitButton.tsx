import React from "react";
import Button from "../atoms/Button";
import LoadingSpinner from "../atoms/LoadingSpinner";

interface SubmitButtonProps {
  isLogin?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLogin,
  isLoading = false,
  disabled = false,
  label,
  className,
}) => {
  const defaultClass =
    "w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors";

  const finalClass = className || defaultClass;

  const getLabel = () => {
    if (isLogin !== undefined) {
      if (isLoading) return isLogin ? "Iniciando sesión..." : "Registrando...";
      return isLogin ? "Iniciar sesión" : "Registrarse";
    }
    return isLoading ? "Enviando..." : label || "Confirmar";
  };

  return (
    <Button type="submit" disabled={disabled || isLoading} className={finalClass}>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner size="md" className="mr-3" />
          {getLabel()}
        </div>
      ) : (
        getLabel()
      )}
    </Button>
  );
};

export default SubmitButton;