'use client';

import React from 'react';
import HomeLayout from '../../components/layouts/HomeLayout';
import { useCartStore } from '../../components/organisms/CartStore';
import { useRouter } from 'next/navigation';
import CartContent from '../../components/organisms/CartContent';

export default function CarritoPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();
  const router = useRouter();

  const handleContinuar = () => {
    if (items.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de continuar.");
      return;
    }
    router.push('/confirmarp'); 
  };

  return (
    <HomeLayout>
      <CartContent
        items={items}
        totalPrice={totalPrice}
        totalItems={totalItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        onContinue={handleContinuar}
      />
    </HomeLayout>
  );
}
