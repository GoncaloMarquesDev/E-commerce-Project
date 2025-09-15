import Card from "../card/Card";
import "./ShopCartCard.scss";

function ShopCartCard({ imgSrc, itemName, price, quantity,discription }) {
  //os componentes devem ser nomes no singular
  return (
    <div className="shopcard">
      <Card>
        {" "}
        <div className="shop-card-container">
          <div className="shop-img" >
            <img src={imgSrc} alt={"imagem produto"} />
          </div>

          <div className="shop-discription">
            <p className="shop-title">{itemName}</p>
            <p className="shop-discription">{discription}</p>
            
          
          </div>
          <div className="shop-price-item">
            <p>Price</p>
            <p className="price-color">{price} €</p>
            
          </div>
        </div>
      </Card>
    </div>
  );
}
export default ShopCartCard;
