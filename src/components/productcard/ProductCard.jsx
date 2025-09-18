import Card from "../card/Card";
import "./ProductCard.scss";

function ProductCard({ imgSrc, itemName, price, quantity, noHover = false }) {
  return (
    <div className={`card ${noHover ? "no-hover" : ""}`}>
      <Card>
        <img src={imgSrc} alt={itemName} />
        <p>{itemName}</p>
        <p>{price} €</p>
        {quantity !== undefined && <p>{quantity}</p>}
      </Card>
    </div>
  );
}

export default ProductCard;
