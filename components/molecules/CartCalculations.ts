// MOLÉCULAS - Funciones de cálculo del carrito
import { CartItem } from "../atoms/ProductTypes";

export const calculateTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.subtotal, 0),
});
