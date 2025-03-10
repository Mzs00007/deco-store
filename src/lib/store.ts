import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cart: {
    items: CartItem[];
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      cart: {
        items: []
      },
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
          cart: { items: [...state.items, item] }
        })),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
          cart: { items: state.items.filter((item) => item.id !== itemId) }
        })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
          cart: {
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            )
          }
        })),
      clearCart: () => set({ items: [], cart: { items: [] } }),
    }),
    {
      name: 'cart-storage',
    }
  )
); 