import React from 'react';

interface FormToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

const FormToggle: React.FC<FormToggleProps> = ({ isLogin, onToggle }) => {
  return (
    <div className="text-center mt-8">
      <button
        type="button"
        onClick={onToggle}
        className="text-orange-500 hover:text-orange-600 font-medium"
      >
        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </div>
  );
};

export default FormToggle;
