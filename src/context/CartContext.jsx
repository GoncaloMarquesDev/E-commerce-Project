import { createContext, useState, useEffect, useContext } from "react";
const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  console.log("shopcartItem", cart);

  const [quantities, setQuantities] = useState({});

  function updateCartQuantity(productId, quantity) {
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }

  function addToCart(productId, quantity) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === productId);

      if (exists) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { id: productId, quantity }];
    });
  }
  return (
    <CartContext.Provider
      value={{ cart, addToCart, quantities, setQuantities, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartContext, CartProvider };
