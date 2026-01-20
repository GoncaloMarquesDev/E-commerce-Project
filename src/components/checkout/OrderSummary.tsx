import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import type { Product } from "../../types/products";
import "./OrderSummary.scss";

function OrderSummary() {
  const { cart } = useContext(CartContext);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          cart.map(async (item) => {
            const res = await fetch(
              `https://api.escuelajs.co/api/v1/products/${item.id}`
            );
            if (!res.ok) throw new Error("Error fetching product");
            return res.json();
          })
        );

        setProducts(results);
      } catch (error) {
        console.error("Error loading order summary:", error);
      }
    };

    if (cart.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [cart]);

  const total = products.reduce((acc, product) => {
    const cartItem = cart.find(
      (item) => item.id === product.id.toString()
    );
    if (!cartItem) return acc;
    return acc + product.price * cartItem.quantity;
  }, 0);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      {products.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {products.map((product) => {
            const cartItem = cart.find(
              (item) => item.id === product.id.toString()
            );
            if (!cartItem) return null;

            return (
              <li key={product.id} className="order-item">
                <span>{product.title}</span>
                <span>
                  {cartItem.quantity} × {product.price} €
                </span>
                <strong>
                  {(product.price * cartItem.quantity).toFixed(2)} €
                </strong>
              </li>
            );
          })}
        </ul>
      )}

      <div className="order-total">
        <strong>Total:</strong>
        <span>{total.toFixed(2)} €</span>
      </div>
    </div>
  );
}

export default OrderSummary;
