import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, CartItem } from "../atoms/ProductTypes";
import { calculateTotals } from "../molecules/CartCalculations";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;

  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find((i) => i.product.id === product.id);

        const updatedItems = existingItem
          ? items.map((i) =>
              i.product.id === product.id
                ? {
                    ...i,
                    quantity: i.quantity + quantity,
                    subtotal: (i.quantity + quantity) * i.product.price,
                  }
                : i
            )
          : [...items, { product, quantity, subtotal: product.price * quantity }];

        set({ items: updatedItems, ...calculateTotals(updatedItems) });
      },

      removeItem: (productId) => {
        const updatedItems = get().items.filter(
          (i) => i.product.id !== productId
        );
        set({ items: updatedItems, ...calculateTotals(updatedItems) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);

        const updatedItems = get().items.map((i) =>
          i.product.id === productId
            ? { ...i, quantity, subtotal: i.product.price * quantity }
            : i
        );

        set({ items: updatedItems, ...calculateTotals(updatedItems) });
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),

      getItemQuantity: (productId) =>
        get().items.find((i) => i.product.id === productId)?.quantity ?? 0,
    }),
    { name: "cart-storage", version: 1 }
  )
);
