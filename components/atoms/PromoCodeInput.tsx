import React, { useState } from "react";
import Input from "./Input";
import Text from "./Typography";

interface PromoCodeInputProps {
  onCodeChange?: (code: string) => void;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ onCodeChange }) => {
  const [promoCode, setPromoCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setPromoCode(code);
    onCodeChange?.(code);
  };

  return (
    <div>
      <Text variant="body" className="mb-2">Código promocional</Text>
      <div className="flex gap-2">
        <Input
          placeholder="Escribe el código aquí"
          value={promoCode}
          onChange={handleChange}
          className="flex-1"
        />
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          ▼
        </button>
      </div>
    </div>
  );
};

export default PromoCodeInput;

