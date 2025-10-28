import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useCartStore } from "../organisms/CartStore";
import { useAuth } from "../../hooks/useAuth";
import { pedidoService } from "../../services/pedidoService";
import { CrearPedidoDTO } from "../../interfaces/pedido.interface";

export interface CheckoutItem {
  image: string;
  title: string;
  price: number;
  quantity: number;
}

export const useCheckout = (selectedAddressId: number | null) => {
  const router = useRouter();
  const { items: cartItems, updateQuantity, clearCart } = useCartStore();
  const { user } = useAuth();

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

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shippingCost = 0;
  const total = useMemo(() => subtotal + shippingCost, [subtotal, shippingCost]);

  const handleQuantityChange = (index: number, quantity: number) => {
    if (index < cartItems.length) {
      const productId = cartItems[index].product.id;
      updateQuantity(productId, quantity);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user?.id_usuario || !selectedAddressId) {
      await Swal.fire({
        title: "Información incompleta",
        text: "Falta el usuario o la dirección de entrega",
        icon: "warning",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    const productos = cartItems.map((item) => ({
      id_producto: parseInt(item.product.id),
      cantidad: item.quantity,
    }));

    const pedido: CrearPedidoDTO = {
      id_usuario: user.id_usuario,
      id_direccion: selectedAddressId,
      productos,
    };

    console.log("📦 Enviando pedido:", pedido);

    const success = await pedidoService.crearPedido(pedido);
    if (success) {
      await Swal.fire({
        title: "Pedido realizado",
        text: "Tu pedido fue registrado exitosamente",
        icon: "success",
        confirmButtonColor: "#dc2626",
      });
      clearCart();
      router.push("/pedido-confirmado");
    } else {
      await Swal.fire({
        title: "Error",
        text: "No se pudo registrar el pedido. Intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleAddMoreItems = () => {
    router.push("/productos");
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