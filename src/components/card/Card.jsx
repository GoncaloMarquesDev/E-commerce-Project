import "./Card.scss";
function Card({ children, label, flag }) {
  return (
    <div className="img-border-radius">
      {children}
      {label}
      <img src={flag} alt="" />
    </div>
  );
}
export default Card;
