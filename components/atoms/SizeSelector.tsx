import React from "react";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize?: string;
  onSizeSelect: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ 
  sizes, 
  selectedSize, 
  onSizeSelect 
}) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">Talla:</h4>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
              selectedSize === size
                ? "border-orange-500 bg-orange-50 text-orange-700"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
