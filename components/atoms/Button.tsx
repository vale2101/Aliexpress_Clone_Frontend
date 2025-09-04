import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost";
  round?: "md" | "full";
};
const Button: React.FC<ButtonProps> = ({ className = "", variant="solid", round="md", ...props }) => {
  const base = "inline-flex items-center justify-center h-10 px-4 text-sm font-medium transition";
  const shape = round === "full" ? "rounded-full" : "rounded-lg";
  const style = variant === "solid"
    ? "bg-black text-white hover:bg-neutral-800"
    : "bg-transparent hover:bg-neutral-100";
  return <button {...props} className={`${base} ${shape} ${style} ${className}`} />;
};
export default Button;
