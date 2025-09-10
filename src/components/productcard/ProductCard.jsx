import Card from "../card/Card";
import "./ProductCard.scss"

function ProductCard({ imgSrc, itemName, price }) {
  //os componentes devem ser nomes no singular
  return (
    <div className="card">
    <Card >
      {" "}
      <img src={imgSrc} alt={name} />
      <p>{itemName}</p>
      <p>{price} €</p>
    </Card>
    </div>
  );
}
export default ProductCard;
