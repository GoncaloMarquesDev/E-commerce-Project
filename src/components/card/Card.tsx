import "./Card.scss";
import type { ReactNode } from "react";

interface CardPropsBase {
  children: ReactNode;
  label: string;
  flag: string;
}
type CardProps = Partial<CardPropsBase>;
function Card({ children, label, flag }: CardProps) {
  return (
    <div className="img-border-radius">
      {children}
      {label && <span>{label}</span>}
      {flag && <img src={flag} alt="flag" />}
    </div>
  );
}
export default Card;
