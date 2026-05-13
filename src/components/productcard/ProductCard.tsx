import { useContext } from "react";
import Card from "../card/Card";
import "./ProductCard.scss";
import { CartContext } from "../../context/CartContext";
import { notifySuccess } from "../ui/ToastProvider.tsx";

interface ProductCardPropsBase {
  id: number| string;
  imgSrc: string;
  itemName: string;
  price: number;
  quantity?: number;
  noHover?: boolean;
}
type ProductCardProps = Partial<ProductCardPropsBase>;

function ProductCard({
  id,
  imgSrc = "",
  itemName = "",
  price = 0,
  /* quantity = 0, */
  noHover = false,
}: ProductCardProps) {
  const { addToCart } = useContext(CartContext);
  console.log("id q aparece no productcard", id)
  return (
    <div className={`card ${noHover ? "no-hover" : ""}`}>
      <Card>
        <img src={imgSrc} alt={itemName} />
        <p className="title">{itemName}</p>
        <div className="price-and-buy-container">
          <div className="price-container">
            <p className="price">{price} </p>
            <p className="currrency_symbol">€</p>
          </div>
          <button
            className="buy-container"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              addToCart(String(id), itemName, 1);
              notifySuccess("Item added to your cart!");
            }}
          >
            Add to cart
          </button>
        </div>

        {/*  {quantity !== undefined && <p>{quantity}</p>} */}
      </Card>
    </div>
  );
}

export default ProductCard;
