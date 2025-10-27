import React from "react";
import Button from "../atoms/Button";
import Text from "../atoms/Typography";
import Divider from "../atoms/Divider";
import PromoCodeInput from "../atoms/PromoCodeInput";

interface OrderSummaryProps {
  subtotal: number;
  shippingCost?: number;
  total: number;
  discountAmount?: number;
  onPlaceOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingCost = 0,
  total,
  discountAmount = 0,
  onPlaceOrder,
}) => {

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <Text variant="title" as="h2" className="mb-6">
        Resumen
      </Text>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <Text variant="body">Subtotal</Text>
          <Text variant="body" className="font-medium">
            {formatPrice(subtotal)}
          </Text>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <Text variant="body">Descuento</Text>
            <Text variant="body" className="font-medium">
              -{formatPrice(discountAmount)}
            </Text>
          </div>
        )}

        <PromoCodeInput />

        <div className="flex justify-between items-center">
          <Text variant="body">Gastos de envío</Text>
          <div className="flex items-center gap-2">
            <Text variant="body" className="font-medium text-green-600">
              Gratis
            </Text>
            <button className="text-gray-400 hover:text-gray-600">
              ▼
            </button>
          </div>
        </div>

        <Divider />

        <div className="flex justify-between items-center">
          <Text variant="subtitle">Total</Text>
          <Text variant="subtitle">{formatPrice(total)}</Text>
        </div>
      </div>

      <Button
        onClick={onPlaceOrder}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg mb-3"
      >
        Realizar pedido
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Al hacer click en 'Realizar pedido' confirmo haber leido y aceptado los{" "}
        <a href="#" className="text-blue-600 hover:underline">
          términos y condiciones
        </a>
        .
      </p>
    </div>
  );
};

export default OrderSummary;

