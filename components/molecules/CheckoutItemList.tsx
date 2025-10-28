"use client";

import React from "react";
import CheckoutItemDetails from "./CheckoutItemDetails";
import { useCartStore } from "../organisms/CartStore"; 

const CheckoutItemList: React.FC = () => {
  const { items, updateQuantity } = useCartStore();

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleAddMoreItems = () => {
    console.log("🛒 Redirigir a productos");
  };

  return (
    <div>
      {items.map((item) => (
        <CheckoutItemDetails
          key={item.product.id}
          image={item.product.image}
          title={item.product.name}
          price={item.product.price}
          quantity={item.quantity}
          onQuantityChange={(quantity) => handleQuantityChange(item.product.id, quantity)}
          onAddMoreItems={handleAddMoreItems}
        />
      ))}
    </div>
  );
};

export default CheckoutItemList;