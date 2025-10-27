import { useState, useCallback } from "react";

type PaymentMethod = "card" | "gpay" | "paypal";

export const usePaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");

  const handleMethodChange = useCallback((method: PaymentMethod) => {
    setSelectedMethod(method);
  }, []);

  return {
    selectedMethod,
    handleMethodChange,
  };
};

