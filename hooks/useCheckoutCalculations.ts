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

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const subtotalWithDiscount = useMemo(
    () => applyPromoCode(subtotal),
    [subtotal, applyPromoCode]
  );

  const discountAmount = useMemo(
    () => subtotal - subtotalWithDiscount,
    [subtotal, subtotalWithDiscount]
  );

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

