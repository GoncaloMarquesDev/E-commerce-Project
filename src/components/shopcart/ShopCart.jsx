import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router";
import ShopCartCard from "../shopcartcard/ShopCartCard";
import "./ShopCart.scss";

function ShopCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const { cart, updateCartQuantity } = useContext(CartContext);

  const totalPrice = cartProducts.reduce((acc, product) => {
    const cartItem = cart.find((c) => c.id === product.id);
    if (!cartItem) return acc;
    return acc + product.price * cartItem.quantity;
  }, 0);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const results = await Promise.all(
          cart.map(async (item) => {
            const res = await fetch(
              `https://api.escuelajs.co/api/v1/products/${item.id}`
            );
            return await res.json();
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
            {cartProducts.map((item) => {
              const cartItem = cart.find((c) => c.id === item.id);
              if (!cartItem || cartItem.quantity <= 0) return null;

              return (
                <div className="card-wrapper-shop" key={item.id}>
                  <Link to={`/detail/${item.id}`} className="shopcard-link">
                    <ShopCartCard
                      imgSrc={item.images?.[0]}
                      itemName={item.title}
                      price={item.price}
                      description={item.description}
                    />

                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          updateCartQuantity(
                            item.id,
                            (cartItem.quantity || 0) - 1
                          );
                        }}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        value={cartItem.quantity}
                        min="0"
                        onChange={(e) => {
                          e.preventDefault();
                          updateCartQuantity(
                            item.id,
                            Number(e.target.value)
                          );
                        }}
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          updateCartQuantity(
                            item.id,
                            (cartItem.quantity || 0) + 1
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
            <p className="cart-total">{totalPrice.toFixed(2)} € : Total </p>
            <p>
              <span>
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>{" "}
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
