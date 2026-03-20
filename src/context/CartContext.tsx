import {
  useMemo,
  useCallback,
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface CartItem {
  id: string;
  title: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  quantities: Record<string, number>;
  addToCart: (id: string, title: string, quantity?: number) => void; // recebe o name
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

const CART_STORAGE_KEY = "cart_state";

/**
 * Lê o estado inicial do carrinho a partir do localStorage
 */
function getInitialCartState(): {
  cart: CartItem[];
  quantities: Record<string, number>;
} {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return { cart: [], quantities: {} };
    }

    return JSON.parse(stored);
  } catch {
    return { cart: [], quantities: {} };
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const initialState = getInitialCartState();

  const [cart, setCart] = useState<CartItem[]>(initialState.cart);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    initialState.quantities,
  );

  const addToCart = useCallback(
    (id: string, title: string, quantity: number = 1) => {
      if (quantity <= 0) return;

      setCart((prev) => {
        const exists = prev.find((item) => item.id === id);

        if (exists) {
          return prev.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          );
        }

        return [...prev, { id, title, quantity }];
      });

      setQuantities((prev) => ({ ...prev, [id]: quantity }));
    },
    [],
  );

const updateCartQuantity = useCallback(
  (id: string, quantity: number) => {
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
        item.id === id ? { ...item, quantity } : item,
      );
    });
  },
  [],
);


  /**
   * Mantém o localStorage sincronizado com o estado do carrinho
   */
  useEffect(() => {
    const data = { cart, quantities };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
  }, [cart, quantities]);

  const value = useMemo(() => {
    return {
      cart,
      quantities,
      addToCart,
      updateCartQuantity,
    };
  }, [cart, quantities, addToCart, updateCartQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
