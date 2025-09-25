import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definir el tipo de producto
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: number;
  reviews?: number;
}

// Definir el tipo de item en el carrito
export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

// Definir el estado del carrito
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  // Acciones
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
}

// Función para calcular subtotal
const calculateSubtotal = (price: number, quantity: number): number => {
  return price * quantity;
};

// Función para calcular totales
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.subtotal, 0);
  return { totalItems, totalPrice };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product, quantity: number = 1) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(item => item.product.id === product.id);

        if (existingItemIndex > -1) {
          // Si el producto ya existe, actualizar la cantidad
          const updatedItems = items.map((item, index) => {
            if (index === existingItemIndex) {
              const newQuantity = item.quantity + quantity;
              return {
                ...item,
                quantity: newQuantity,
                subtotal: calculateSubtotal(item.product.price, newQuantity)
              };
            }
            return item;
          });
          
          const { totalItems, totalPrice } = calculateTotals(updatedItems);
          set({ items: updatedItems, totalItems, totalPrice });
        } else {
          // Si es un producto nuevo, agregarlo al carrito
          const newItem: CartItem = {
            product,
            quantity,
            subtotal: calculateSubtotal(product.price, quantity)
          };
          
          const updatedItems = [...items, newItem];
          const { totalItems, totalPrice } = calculateTotals(updatedItems);
          set({ items: updatedItems, totalItems, totalPrice });
        }
      },

      removeItem: (productId: string) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.product.id !== productId);
        const { totalItems, totalPrice } = calculateTotals(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map(item => {
          if (item.product.id === productId) {
            return {
              ...item,
              quantity,
              subtotal: calculateSubtotal(item.product.price, quantity)
            };
          }
          return item;
        });
        
        const { totalItems, totalPrice } = calculateTotals(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      getItemQuantity: (productId: string) => {
        const { items } = get();
        const item = items.find(item => item.product.id === productId);
        return item ? item.quantity : 0;
      }
    }),
    {
      name: 'cart-storage', // nombre único para localStorage
      version: 1, // versión para migraciones futuras
    }
  )
);
