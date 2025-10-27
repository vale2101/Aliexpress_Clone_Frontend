import { useState, useCallback } from "react";

export interface PromoCodeResult {
  isValid: boolean;
  discount?: number;
  message?: string;
}

// Simulación de códigos promocionales válidos
const VALID_PROMO_CODES: Record<string, number> = {
  WELCOME10: 10, // 10% de descuento
  BLACKFRIDAY: 25, // 25% de descuento
  PRIMERA: 50, // $50 de descuento
};

export const usePromoCode = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoResult, setPromoResult] = useState<PromoCodeResult | null>(null);

  const validatePromoCode = useCallback((code: string) => {
    const upperCode = code.toUpperCase();
    
    if (!upperCode) {
      setPromoResult(null);
      return;
    }

    const discount = VALID_PROMO_CODES[upperCode];
    
    if (discount) {
      setPromoResult({
        isValid: true,
        discount,
        message: discount >= 50 
          ? `Descuento de $${discount} aplicado`
          : `Descuento del ${discount}% aplicado`,
      });
    } else {
      setPromoResult({
        isValid: false,
        message: "Código promocional no válido",
      });
    }
  }, []);

  const handlePromoCodeChange = useCallback((code: string) => {
    setPromoCode(code);
    validatePromoCode(code);
  }, [validatePromoCode]);

  const applyPromoCode = useCallback((subtotal: number) => {
    if (!promoResult?.isValid || !promoResult.discount) {
      return subtotal;
    }

    const discount = promoResult.discount;
    
    // Si el descuento es mayor a 50, asumimos que es un monto fijo
    if (discount >= 50) {
      return Math.max(0, subtotal - discount);
    }
    
    // Si no, es un porcentaje
    return subtotal * (1 - discount / 100);
  }, [promoResult]);

  return {
    promoCode,
    handlePromoCodeChange,
    promoResult,
    applyPromoCode,
    clearPromoCode: () => {
      setPromoCode("");
      setPromoResult(null);
    },
  };
};

