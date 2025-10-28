import React from "react";
import Text from "../atoms/Typography";

interface PedidosListHeaderProps {
  title: string;
  subtitle?: string;
}

const PedidosListHeader: React.FC<PedidosListHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <Text variant="title" className="font-bold text-2xl mb-2">
        {title}
      </Text>
      {subtitle && (
        <Text variant="body" className="text-gray-600">
          {subtitle}
        </Text>
      )}
    </div>
  );
};

export default PedidosListHeader;

