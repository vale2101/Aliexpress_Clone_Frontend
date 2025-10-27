"use client";

import React from "react";
import DeliveryAddressSection from "../molecules/DeliveryAddressSection";
import PaymentMethodsSection from "../molecules/PaymentMethodsSection";
import ShippingMethodSection from "../molecules/ShippingMethodSection";
import CheckoutItemDetails from "../molecules/CheckoutItemDetails";
import OrderSummary from "../molecules/OrderSummary";
import SecurityTrust from "../molecules/SecurityTrust";
import FastDelivery from "../molecules/FastDelivery";
import SecurityPrivacy from "../molecules/SecurityPrivacy";
import SecurePayments from "../molecules/SecurePayments";
import { useCheckoutCalculations } from "../../hooks/useCheckoutCalculations";

interface CheckoutItem {
  image: string;
  title: string;
  price: number;
  quantity: number;
}

interface CheckoutLayoutProps {
  items: CheckoutItem[];
  onPlaceOrder: () => void;
  onQuantityChange?: (index: number, quantity: number) => void;
  onAddMoreItems?: () => void;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  items,
  onPlaceOrder,
  onQuantityChange,
  onAddMoreItems,
}) => {
  // Calcular totales usando el hook
  const { subtotal, total, hasDiscount, discountAmount } = useCheckoutCalculations({
    items,
  });

  const handleQuantityChange = (index: number, quantity: number) => {
    onQuantityChange?.(index, quantity);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-800 py-3">
        <div className="container mx-auto px-4">
          <div className="text-xl font-bold">
            <span className="text-yellow-400">Ali</span>
            <span className="text-white">Express</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <DeliveryAddressSection />

            {/* Payment Methods */}
            <PaymentMethodsSection />

            {/* Shipping Method */}
            <ShippingMethodSection />

            {/* Item Details */}
            <CheckoutItemDetails
              image={items[0]?.image || ""}
              title={items[0]?.title || ""}
              price={items[0]?.price || 0}
              quantity={items[0]?.quantity || 1}
              onQuantityChange={(qty) => handleQuantityChange(0, qty)}
              onAddMoreItems={onAddMoreItems}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Order Summary */}
            <OrderSummary
              subtotal={subtotal}
              shippingCost={0}
              total={total}
              discountAmount={hasDiscount ? discountAmount : 0}
              onPlaceOrder={onPlaceOrder}
            />

            {/* Security/Trust Section */}
            <SecurityTrust />

            {/* Fast Delivery */}
            <FastDelivery />

            {/* Security & Privacy */}
            <SecurityPrivacy />

            {/* Secure Payments */}
            <SecurePayments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;

