import React from "react";
import Text from "../atoms/Typography";
import LinkButton from "../atoms/LinkButton";

interface DeliveryAddressSectionProps {
  address?: string;
  onAddAddress?: () => void;
}

const DeliveryAddressSection: React.FC<DeliveryAddressSectionProps> = ({
  address,
  onAddAddress,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <Text variant="title" as="h2">
          Dirección de entrega
        </Text>
      </div>
      {address ? (
        <div className="text-gray-700">{address}</div>
      ) : (
        <LinkButton onClick={onAddAddress}>+ Añadir nueva dirección</LinkButton>
      )}
    </div>
  );
};

export default DeliveryAddressSection;

