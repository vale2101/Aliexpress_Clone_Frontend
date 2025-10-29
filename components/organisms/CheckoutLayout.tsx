"use client";

import React from "react";
import DeliveryAddressSelector from "../molecules/DeliveryAddressSection"; 
import PaymentMethodsSection from "../molecules/PaymentMethodsSection";
import ShippingMethodSection from "../molecules/ShippingMethodSection";
import CheckoutItemList from "../molecules/CheckoutItemList";
import OrderSummary from "../molecules/OrderSummary";
import SecurityTrust from "../molecules/SecurityTrust";
import FastDelivery from "../molecules/FastDelivery";
import SecurityPrivacy from "../molecules/SecurityPrivacy";
import SecurePayments from "../molecules/SecurePayments";
import { useCheckoutCalculations } from "../../hooks/useCheckoutCalculations";
import { AddressInterface } from "../../interfaces/address.interface"; 

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
  onAddressSelect?: (address: AddressInterface) => void;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({
  items,
  onPlaceOrder,
  onQuantityChange,
  onAddMoreItems,
  onAddressSelect,
}) => {
  const { subtotal, total, hasDiscount, discountAmount } = useCheckoutCalculations({
    items,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-800 py-3">
        <div className="container mx-auto px-4">
          <div className="text-xl font-bold">
            <span className="text-yellow-400">Ali</span>
            <span className="text-white">Express</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <DeliveryAddressSelector onSelect={onAddressSelect} />  

            <PaymentMethodsSection />
            <ShippingMethodSection />
            <CheckoutItemList />
          </div>

          <div className="space-y-6">
            <OrderSummary
              subtotal={subtotal}
              shippingCost={0}
              total={total}
              discountAmount={hasDiscount ? discountAmount : 0}
              onPlaceOrder={onPlaceOrder}
            />

            <SecurityTrust />
            <FastDelivery />
            <SecurityPrivacy />
            <SecurePayments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;