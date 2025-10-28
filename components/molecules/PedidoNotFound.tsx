import React from "react";
import Text from "../atoms/Typography";
import Button from "../atoms/Button";

interface PedidoNotFoundProps {
  onBack: () => void;
}

const PedidoNotFound: React.FC<PedidoNotFoundProps> = ({ onBack }) => {
  return (
    <div className="text-center py-12">
      <Text variant="title" className="font-bold text-gray-500 mb-2">
        Pedido no encontrado
      </Text>
      <Text variant="body" className="text-gray-400">
        El pedido solicitado no existe o no tienes permiso para verlo.
      </Text>
      <Button
        onClick={onBack}
        className="mt-4 text-orange-500 hover:text-orange-600"
      >
        Volver a mis pedidos
      </Button>
    </div>
  );
};

export default PedidoNotFound;

