import React from "react";
import Text from "../atoms/Typography";
import Button from "../atoms/Button";
import { useRouter } from "next/navigation";

const CartEmptyState: React.FC = () => {
  const router = useRouter();

  return (
    <div className="text-center py-16">
      <Text variant="title" className="text-2xl font-bold text-gray-900 mb-2">
        Tu carrito está vacío
      </Text>
      <Text variant="body" className="text-gray-600 mb-8">
        Añade algunos productos para comenzar tu compra
      </Text>
      <div className="space-y-4 max-w-sm mx-auto">
        <Button
          onClick={() => router.push('/user')}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors"
        >
          Identifícate
        </Button>
        <Button
          onClick={() => router.push('/')}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors"
        >
          Explora artículos
        </Button>
      </div>
    </div>
  );
};

export default CartEmptyState;

