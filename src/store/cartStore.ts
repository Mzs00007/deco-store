import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  
  addItem: (item) => set((state) => {
    const existingItem = state.cart.find((i) => i.id === item.id);
    
    if (existingItem) {
      return {
        cart: state.cart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      };
    }
    
    return {
      cart: [...state.cart, { ...item, quantity: 1 }]
    };
  }),
  
  removeItem: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id)
  })),
  
  updateQuantity: (id, quantity) => set((state) => {
    if (quantity === 0) {
      return {
        cart: state.cart.filter((item) => item.id !== id)
      };
    }
    
    return {
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    };
  }),
  
  clearCart: () => set({ cart: [] })
})); 