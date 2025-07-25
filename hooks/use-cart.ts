import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';
import toast from 'react-hot-toast';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, quantity?: number) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (data: Product, quantity: number = 1) => {
        if(data.stock === 0) {
            return toast('Product out of stock');
        }

        const currentItems = get().items;
        const existing = currentItems.find(item => item.id === data.id);

        if (existing) {
          const newQty = Math.min(existing.quantity + quantity, data.stock);
          if (existing.quantity === newQty) {
            return toast('Reached max stock for this item');
          }
          set({
            items: currentItems.map(item =>
              item.id === data.id ? { ...item, quantity: newQty } : item
            ),
          });
          return toast.success(`Updated quantity of ${data.name} to ${newQty}`);
        }

        // New item
        const qtyToAdd = Math.min(quantity, data.stock);
        set({
          items: [...currentItems, { ...data, quantity: qtyToAdd }],
        });
        toast.success(`Added ${data.name} to cart`);
      },

      updateItemQuantity: (id: string, quantity: number) => {
        const currentItems = get().items;
        const item = currentItems.find(i => i.id === id);
        if (!item) return;

        const clamped = Math.max(1, Math.min(quantity, item.stock));
        set({
          items: currentItems.map(i =>
            i.id === id ? { ...i, quantity: clamped } : i
          ),
        });
        toast.success(`Quantity updated to ${clamped}`);
      },

      removeItem: (id: string) => {
        set({
          items: get().items.filter(item => item.id !== id),
        });
        toast.success('Item removed from the cart');
      },

      removeAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
