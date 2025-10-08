import Card from "../card/Card";
import "./ProductCard.scss";

interface ProductCardPropsBase{
  imgSrc:string;
  itemName: string;
   price: number;
   quantity?:number;
   noHover?:boolean;
}
type ProductCardProps = Partial<ProductCardPropsBase>;

function ProductCard({ imgSrc ="", itemName ="", price =0, quantity=0, noHover = false }:ProductCardProps) {
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
