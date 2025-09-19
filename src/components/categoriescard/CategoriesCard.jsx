import "./CategoriesCard.scss";
function CategoriesCard({ children, header, text1, text2 }) {
  return (
    <div className="product_card">
      {children}

      <h1 className=" header">{header}</h1>
      <div className="text">
        <p className="category">{text1}</p>
        <p className="item">{text2}</p>
      </div>
    </div>
  );
}
export default CategoriesCard;
