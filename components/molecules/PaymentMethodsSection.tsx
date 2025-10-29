import React from "react";
import Text from "../atoms/Typography";
import RadioButton from "../atoms/RadioButton";
import { usePaymentMethod } from "../../hooks/usePaymentMethod";

interface PaymentMethodsSectionProps {
  onPaymentMethodChange?: (method: string) => void;
}

const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({
  onPaymentMethodChange,
}) => {
  const { selectedMethod, handleMethodChange } = usePaymentMethod();

  const handleChange = (method: string) => {
    handleMethodChange(method as "card" | "gpay" | "paypal");
    onPaymentMethodChange?.(method);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <Text variant="title" as="h2" className="mb-4">
        Métodos de pago
      </Text>

      <div className="space-y-3">
        <RadioButton
          label="Añadir una tarjeta nueva"
          checked={selectedMethod === "card"}
          onChange={() => handleChange("card")}
        >
          <div className="flex items-center gap-2 mt-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
          </div>
        </RadioButton>

        <RadioButton
          label="GPay Google Pay"
          checked={selectedMethod === "gpay"}
          onChange={() => handleChange("gpay")}
        />
      </div>
    </div>
  );
};

export default PaymentMethodsSection;

