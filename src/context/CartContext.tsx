import { createContext, useState, type ReactNode } from "react";
interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  quantities: Record<string, number>;
  addToCart: (id: string, quantity?: number) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  quantities: {},
  addToCart: () => {},
  updateCartQuantity: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]); //
  const [quantities, setQuantities] = useState<Record<string, number>>({}); //

  const addToCart = (id: string, quantity: number = 1) => {
    if (quantity <= 0) return;
    setCart((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item
        );
      } else {
        return [...prev, { id, quantity }];
      }
    });
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setQuantities((prev) => {
      const copy = { ...prev };
      if (quantity <= 0) {
        delete copy[id];
      } else {
        copy[id] = quantity;
      }
      return copy;
    });

    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, quantities, addToCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
