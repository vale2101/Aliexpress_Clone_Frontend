import React from "react";
import { Package } from "lucide-react";
import Text from "../atoms/Typography";
import Button from "../atoms/Button";
import Link from "next/link";

interface PedidosEmptyStateProps {
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
}

const PedidosEmptyState: React.FC<PedidosEmptyStateProps> = ({
  title,
  message,
  buttonText,
  buttonLink
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <Text variant="title" className="font-bold mb-2">
        {title}
      </Text>
      <Text variant="body" className="text-gray-600 mb-6">
        {message}
      </Text>
      <Link href={buttonLink}>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default PedidosEmptyState;

