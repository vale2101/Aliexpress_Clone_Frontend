import React from "react";
import Icon from "../atoms/Icon";
import Text from "../atoms/Typography";
import { LucideIcon } from "lucide-react";

type OrderStatusItemProps = {
  icon: LucideIcon;
  label: string;
};

const OrderStatusItem: React.FC<OrderStatusItemProps> = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center text-center px-6 py-4">
      <Icon icon={icon} size="lg" className="text-orange-500" />
      <Text variant="small" className="mt-2">{label}</Text>
    </div>
  );
};

export default OrderStatusItem;
