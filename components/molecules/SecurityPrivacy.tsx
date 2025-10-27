import React from "react";
import Text from "../atoms/Typography";

const SecurityPrivacy: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-2">
        <Text variant="title" as="h3">
          Seguridad & Privacidad
        </Text>
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <Text variant="body" className="text-sm text-gray-600">
        Pagos seguros - Datos personales seguros
      </Text>
    </div>
  );
};

export default SecurityPrivacy;

