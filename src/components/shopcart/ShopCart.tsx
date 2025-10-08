import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router";
import ShopCartCard from "../shopcartcard/ShopCartCard";
import "./ShopCart.scss";
import type { Product } from "../../types/products";

function ShopCart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const { cart, updateCartQuantity } = useContext(CartContext);

  // Calcula o preço total
  const totalPrice = cartProducts.reduce((acc, product) => {
    const cartItem = cart.find((c) => c.id === product.id.toString());
    if (!cartItem) return acc;
    return acc + product.price * cartItem.quantity;
  }, 0);

  useEffect(() => {
    const fetchCartProducts = async (): Promise<void> => {
      try {
        const results = await Promise.all(
          cart.map(async (cartItem) => {
            const res = await fetch(
              `https://api.escuelajs.co/api/v1/products/${cartItem.id}`
            );
            if (!res.ok) throw new Error("Error fetching product");
            const product: Product = await res.json();
            return product;
          })
        );
        setCartProducts(results);
      } catch (error) {
        console.error("Error searching cart items:", error);
      }
    };

    if (cart.length > 0) {
      fetchCartProducts();
    } else {
      setCartProducts([]);
    }
  }, [cart]);

  return (
    <div className="wrapper-shop">
      <div className="shop-wrapper">
        {cartProducts.length === 0 ? (
          <p className="empty-cart">Empty Shop Cart</p>
        ) : (
          <div className="flex-shop">
            {cartProducts.map((product) => {
              const cartItem = cart.find((c) => c.id === product.id.toString());
              if (!cartItem || cartItem.quantity <= 0) return null;

              return (
                <div className="card-wrapper-shop" key={product.id}>
                  <Link to={`/detail/${product.id}`} className="shopcard-link">
                    <ShopCartCard
                      imgSrc={product.images?.[0]}
                      itemName={product.title}
                      price={product.price}
                      description={product.description}
                    />

                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          updateCartQuantity(
                            product.id.toString(),
                            cartItem.quantity - 1
                          );
                        }}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        min="0"
                        value={cartItem.quantity}
                        onChange={(e) => {
                          const newQuantity = Number(e.target.value);
                          updateCartQuantity(
                            product.id.toString(),
                            newQuantity
                          );
                        }}
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          updateCartQuantity(
                            product.id.toString(),
                            cartItem.quantity + 1
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <div className="sidebar">
          <div className="price-container">
            <p className="cart-total">{totalPrice.toFixed(2)} € : Total</p>
            <p>
              <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>{" "}
              : Items in cart
            </p>
            <button className="shop-cart-btn">BUY</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopCart;
