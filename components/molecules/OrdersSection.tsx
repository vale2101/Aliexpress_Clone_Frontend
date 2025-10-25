import React from "react";
import Text from "../atoms/Typography";
import OrderStatusItem from "./OrderStatusItem";
import { Wallet, Package, Truck, FileCheck } from "lucide-react";

const OrdersSection: React.FC = () => {
  const orderStatuses = [
    { icon: Wallet, label: "Pendientes de pago" },
    { icon: Package, label: "Pendientes de envío" },
    { icon: Truck, label: "Enviado" },
    { icon: FileCheck, label: "Pendientes de valoración" }
  ];

  return (
    <div className="bg-white p-6 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <Text variant="title" className="font-bold">Pedidos</Text>
        <div className="flex items-center text-orange-500 cursor-pointer hover:underline">
          <Text variant="body" className="text-orange-500">Ver todo</Text>
          <span className="ml-1">→</span>
        </div>
      </div>
      <div className="flex justify-between">
        {orderStatuses.map((status, index) => (
          <OrderStatusItem key={index} icon={status.icon} label={status.label} />
        ))}
      </div>
    </div>
  );
};

export default OrdersSection;
