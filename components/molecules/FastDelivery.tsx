import React from "react";
import Text from "../atoms/Typography";
import { Check } from "lucide-react";

const FastDelivery: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <Text variant="title" as="h3">
          Entrega rápida
        </Text>
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          <Text variant="body">Cupón de US $1.00 por entrega tardía</Text>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          <Text variant="body">Reembolso por pérdida del paquete</Text>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          <Text variant="body">Reembolso por artículos dañados</Text>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          <Text variant="body">Reembolso si no llega en 45 días</Text>
        </div>
      </div>
    </div>
  );
};

export default FastDelivery;

