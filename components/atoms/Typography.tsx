import React from "react";

type TextProps = {
  children: React.ReactNode;
  variant?: "title" | "subtitle" | "body" | "small";
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
};

const Text: React.FC<TextProps> = ({ 
  children, 
  variant = "body", 
  className = "", 
  as: Component = "p" 
}) => {
  const styles = {
    title: "text-xl font-bold",
    subtitle: "text-lg font-medium text-neutral-700",
    body: "text-sm text-neutral-800",
    small: "text-xs text-neutral-500",
  };

  return <Component className={`${styles[variant]} ${className}`}>{children}</Component>;
};

export default Text;
