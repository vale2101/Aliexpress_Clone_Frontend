import { useMemo } from "react";
import { CheckoutItem } from "./useCheckout";
import { usePromoCode } from "./usePromoCode";

interface UseCheckoutCalculationsProps {
  items: CheckoutItem[];
  shippingCost?: number;
}

export const useCheckoutCalculations = ({
  items,
  shippingCost = 0,
}: UseCheckoutCalculationsProps) => {
  const { promoResult, applyPromoCode } = usePromoCode();

  // Calcular subtotal
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  // Aplicar descuento promocional si existe
  const subtotalWithDiscount = useMemo(
    () => applyPromoCode(subtotal),
    [subtotal, applyPromoCode]
  );

  // Calcular descuento aplicado
  const discountAmount = useMemo(
    () => subtotal - subtotalWithDiscount,
    [subtotal, subtotalWithDiscount]
  );

  // Calcular total final
  const total = useMemo(
    () => subtotalWithDiscount + shippingCost,
    [subtotalWithDiscount, shippingCost]
  );

  return {
    subtotal,
    subtotalWithDiscount,
    discountAmount,
    shippingCost,
    total,
    hasDiscount: discountAmount > 0,
    promoResult,
  };
};

