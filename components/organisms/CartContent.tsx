import React from "react";
import CartHeader from "../molecules/CartHeader";
import CartEmptyState from "../molecules/CartEmptyState";
import CartItemList from "../molecules/CartItemList";
import CartSummary from "../molecules/CartSummary";

interface CartContentProps {
  items: Array<{
    product: {
      id: string;
      name: string;
      image: string;
      price: number;
    };
    quantity: number;
  }>;
  totalPrice: number;
  totalItems: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onContinue: () => void;
}

const CartContent: React.FC<CartContentProps> = ({
  items,
  totalPrice,
  totalItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onContinue
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <CartHeader itemCount={items.length} onClearCart={onClearCart} />

            <div className="p-6">
              {items.length === 0 ? (
                <CartEmptyState />
              ) : (
                <CartItemList
                  items={items}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <CartSummary
            totalPrice={totalPrice}
            totalItems={totalItems}
            onContinue={onContinue}
            onClearCart={onClearCart}
          />
        </div>
      </div>
    </div>
  );
};

export default CartContent;

