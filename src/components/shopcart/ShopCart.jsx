import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import "./ShopCart.scss";
import { Link } from "react-router";
import ShopCartCard from "../shopcartcard/ShopCartCard";

function ShopCart() {
  const [cartProducts, setCartProducts] = useState([]);
  console.log("cartProducts", cartProducts);

  const { cart, updateCartQuantity } = useContext(CartContext);

  console.log("cart quantidade e id", cart);

  const totalPrice = cartProducts.reduce((acc, product) => {
  const cartItem = cart.find(c => c.id === product.id);
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
        console.error("Error searching cart itens:", error);
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
            // procura no cart a entrada correspondente ao id do produto
            const cartItem = cart.find((c) => c.id === item.id);

            return (
              <div className="card-wrapper-shop">
                <Link to={`/detail/${item.id}`} key={item.id}>
                  <ShopCartCard
                    imgSrc={item.images?.[0]}
                    itemName={item.title}
                    price={item.price}
                    discription={item.description}
                  />
                </Link>

                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={() =>
                      updateCartQuantity(
                        item.id,
                        Math.max(0, (cartItem?.quantity || 0) - 1)
                      )
                    }
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={cartItem?.quantity || 0}
                    min="0"
                    onChange={(e) =>
                      updateCartQuantity(
                        item.id,
                        Math.max(0, Number(e.target.value))
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      updateCartQuantity(item.id, (cartItem?.quantity || 0) + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        )}
        <div className="sidebar">
          <div className="price-container">
            <p className="cart-total">{totalPrice.toFixed(2)} € : Total </p>
            

            <p> <span>{cart.reduce((acc, item) => acc + item.quantity, 0)} </span>:Itens in cart </p>
          
            <button className="shop-cart-btn"> BUY </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ShopCart;
