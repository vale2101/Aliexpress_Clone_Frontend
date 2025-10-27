import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../components/organisms/CartStore";

export interface CheckoutItem {
  image: string;
  title: string;
  price: number;
  quantity: number;
}

export const useCheckout = () => {
  const router = useRouter();
  const { items: cartItems, updateQuantity, clearCart } = useCartStore();

  // Convertir items del carrito al formato de checkout
  const items: CheckoutItem[] = useMemo(
    () =>
      cartItems.map((cartItem) => ({
        image: cartItem.product.image,
        title: cartItem.product.name,
        price: cartItem.product.price,
        quantity: cartItem.quantity,
      })),
    [cartItems]
  );

  // Calcular totales
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shippingCost = 0; // En el futuro esto podría venir de una configuración

  const total = useMemo(
    () => subtotal + shippingCost,
    [subtotal, shippingCost]
  );

  const handleQuantityChange = (index: number, quantity: number) => {
    if (index < cartItems.length) {
      const productId = cartItems[index].product.id;
      updateQuantity(productId, quantity);
    }
  };

  const handlePlaceOrder = () => {
    // Aquí iría la lógica para procesar el pedido
    console.log("Procesando pedido:", cartItems);
    
    // TODO: Aquí iría la llamada al API para procesar el pedido
    // await processOrder(cartItems);
    
    alert("Pedido realizado con éxito");
    clearCart();
    router.push("/");
  };

  const handleAddMoreItems = () => {
    router.push("/");
  };

  return {
    items,
    subtotal,
    shippingCost,
    total,
    handleQuantityChange,
    handlePlaceOrder,
    handleAddMoreItems,
    isCartEmpty: cartItems.length === 0,
  };
};

