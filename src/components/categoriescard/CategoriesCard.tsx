import type { ReactNode } from "react";
import "./CategoriesCard.scss";
interface CategoriesCardProps {
  children?: ReactNode;
  header?: string;
  text1?: string;
  text2?: string;
}
function CategoriesCard({
  children,
  header,
  text1,
  text2,
}: CategoriesCardProps) {
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
