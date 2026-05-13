import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./MiniCart.scss";

interface MiniCartProps {
  isPreview?: boolean;
}

export default function MiniCart({ isPreview = false }: MiniCartProps) {
  const { cart } = useContext(CartContext);
  console.log(cart);


  return (
    <div className={isPreview ? "mini-cart-preview" : "mini-cart-full"}>
      {cart.length === 0 ? (
        <p>ShopCart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            
            <li key={item.id}>
               {item.title}  <li><span className="pbold">quantity: {item.quantity}</span></li> 
            </li>
          ))}
        </ul>
      )}

      {!isPreview && (
        <button onClick={() => { /* navegar para checkout, se quiseres */ }}>
          Go to checkout
        </button>
      )}
    </div>
  );
}
