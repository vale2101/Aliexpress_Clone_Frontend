import React from "react";

type ButtonProps = {
  label?: string; // ahora es opcional
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children?: React.ReactNode; // 🔑 nuevo
};

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", children }) => {
  const baseStyle = "px-4 py-2 rounded font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-orange-500 text-white hover:bg-orange-600"
      : "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <button onClick={onClick} className={`${baseStyle} ${styles}`}>
      {children ?? label} {/* si hay hijos, se muestran; si no, se usa el label */}
    </button>
  );
};

export default Button;
