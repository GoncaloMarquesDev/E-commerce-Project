import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // {id, quantity}
  const [quantities, setQuantities] = useState({}); // { [id]: quantity }

  const addToCart = (id, quantity = 1) => {
    if (quantity <= 0) return; // não adiciona zero
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

  const updateCartQuantity = (id, quantity) => {
    setQuantities((prev) => {
      const copy = { ...prev };
      if (quantity <= 0) {
        delete copy[id]; // remove do objeto quantities
      } else {
        copy[id] = quantity;
      }
      return copy;
    });

    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id); // remove do array
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, quantities, setQuantities, addToCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
