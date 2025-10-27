import React from "react";
import Text from "../atoms/Typography";

interface ShippingMethodSectionProps {
  shippingMethod?: string;
  estimatedDelivery?: string;
}

const ShippingMethodSection: React.FC<ShippingMethodSectionProps> = ({
  shippingMethod = "Envío gratis",
  estimatedDelivery = "12 - 19 de NOV",
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <Text variant="title" as="h2" className="mb-4">
        Método de envío
      </Text>
      <div className="space-y-2 text-gray-700">
        <div>Envío: {shippingMethod}</div>
        <div>Envío: {estimatedDelivery}</div>
      </div>
    </div>
  );
};

export default ShippingMethodSection;

