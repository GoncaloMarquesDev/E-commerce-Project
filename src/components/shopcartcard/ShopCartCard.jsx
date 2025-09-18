import Card from "../card/Card";
import ShopCard from "../shopcard/ShopCard";

import "./ShopCartCard.scss";

function ShopCartCard({ imgSrc, itemName, price, description }) {
  return (
    <div className="shopcard">
      <ShopCard>
        <div className="shop-card-container">
          {/* Imagem do produto */}
          <div className="shop-img">
            <img src={imgSrc} alt={itemName} />
          </div>

          {/* Descrição */}
          <div className="shop-description">
            <p className="shop-title">{itemName}</p>
            <p className="shop-text">{description}</p>
          </div>

          {/* Preço */}
          <div className="shop-price-item">
            <p>Price</p>
            <p className="price-color">{price} €</p>
          </div>
        </div>
      </ShopCard>
    </div>
  );
}

export default ShopCartCard;
