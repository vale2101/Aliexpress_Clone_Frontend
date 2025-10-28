import React from "react";
import Text from "../atoms/Typography";
import Button from "../atoms/Button";

interface CartItemProps {
  item: {
    product: {
      id: string;
      name: string;
      image: string;
      price: number;
    };
    quantity: number;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <img 
        src={item.product.image} 
        alt={item.product.name} 
        className="w-20 h-20 object-cover rounded-lg" 
      />
      <div className="flex-1">
        <Text variant="body" className="font-medium text-gray-900">
          {item.product.name}
        </Text>
        <div className="flex items-center justify-between mt-2">
          <Text variant="subtitle" className="font-bold text-red-600">
            ${item.product.price}
          </Text>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              -
            </Button>
            <Text variant="body" className="w-8 text-center">
              {item.quantity}
            </Text>
            <Button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              +
            </Button>
            <Button
              onClick={() => onRemoveItem(item.product.id)}
              className="text-red-500 hover:text-red-700"
            >
              🗑
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

