import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  collection: string;
  price: number;
  image: string;
  variant?: string;
  quantity: number;
  engraving?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const STORAGE_KEY = 'mulco-cart';

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qty = item.quantity ?? 1;
    setItems((prev) => {
      const key = `${item.id}-${item.variant || ''}`;
      const existing = prev.find((i) => `${i.id}-${i.variant || ''}` === key);

      let updated: CartItem[];
      if (existing) {
        updated = prev.map((i) =>
          `${i.id}-${i.variant || ''}` === key
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      } else {
        updated = [...prev, { ...item, quantity: qty }];
      }

      saveCart(updated);
      return updated;
    });
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((id: string, variant?: string) => {
    setItems((prev) => {
      const key = `${id}-${variant || ''}`;
      const updated = prev.filter((i) => `${i.id}-${i.variant || ''}` !== key);
      saveCart(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number, variant?: string) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const key = `${id}-${variant || ''}`;
      const updated = prev.map((i) =>
        `${i.id}-${i.variant || ''}` === key ? { ...i, quantity } : i
      );
      saveCart(updated);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, drawerOpen, openDrawer, closeDrawer }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
