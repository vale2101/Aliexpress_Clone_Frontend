import React from "react";
import Text from "../atoms/Typography";

const SecurePayments: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <Text variant="title" as="h3" className="mb-4">
        Pagos seguros
      </Text>
      <div className="flex flex-wrap gap-4 mb-3">
        <div className="text-xs text-gray-600">Visa</div>
        <div className="text-xs text-gray-600">ID Check</div>
        <div className="text-xs text-gray-600">SafeKey</div>
        <div className="text-xs text-gray-600">PayPal</div>
        <div className="text-xs text-gray-600">JCB</div>
      </div>
      <Text variant="small" className="text-gray-500">
        Con socios de pago populares tus datos personales están seguros
      </Text>
    </div>
  );
};

export default SecurePayments;

