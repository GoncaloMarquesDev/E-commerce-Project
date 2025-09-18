import "./ShopCard.scss" 
function ShopCard({ children, label,flag}) {
  return (
    <div className="img-border-radius" >
      {children}
      {label}
      <img src={flag} alt="" />
    </div>
  );
}
export default ShopCard;