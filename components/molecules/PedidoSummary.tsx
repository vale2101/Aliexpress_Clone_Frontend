import React from "react";
import Text from "../atoms/Typography";

interface PedidoSummaryProps {
  total: number;
  subtotal?: number;
  envio?: number;
  descuento?: number;
}

const PedidoSummary: React.FC<PedidoSummaryProps> = ({
  total,
  subtotal,
  envio,
  descuento
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Text variant="title" className="font-bold text-gray-900 mb-4">
        Resumen del pedido
      </Text>
      
      <div className="space-y-2">
        {subtotal !== undefined && (
          <div className="flex justify-between items-center">
            <Text variant="body" className="text-gray-600">
              Subtotal
            </Text>
            <Text variant="body" className="font-medium text-gray-900">
              ${subtotal}
            </Text>
          </div>
        )}
        
        {envio !== undefined && (
          <div className="flex justify-between items-center">
            <Text variant="body" className="text-gray-600">
              Envío
            </Text>
            <Text variant="body" className="font-medium text-gray-900">
              ${envio}
            </Text>
          </div>
        )}
        
        {descuento !== undefined && descuento > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <Text variant="body">
              Descuento
            </Text>
            <Text variant="body" className="font-medium">
              -${descuento}
            </Text>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <Text variant="title" className="font-bold text-gray-900">
              Total
            </Text>
            <Text variant="title" className="font-bold text-2xl text-orange-500">
              ${total}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoSummary;

