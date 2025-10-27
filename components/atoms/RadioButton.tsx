import React from "react";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked?: boolean;
  value?: string;
  children?: React.ReactNode;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  checked,
  value,
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-colors ${checked ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'} ${className}`}>
      <input
        type="radio"
        checked={checked}
        value={value}
        className="mt-1 w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
        {...props}
      />
      <div className="flex-1">
        <label className="font-medium text-gray-900 cursor-pointer">
          {label}
        </label>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

export default RadioButton;

