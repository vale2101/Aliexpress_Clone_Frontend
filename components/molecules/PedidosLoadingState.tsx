import React from "react";
import Text from "../atoms/Typography";

const PedidosLoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <Text variant="body" className="text-gray-600">
          Cargando pedidos...
        </Text>
      </div>
    </div>
  );
};

export default PedidosLoadingState;

