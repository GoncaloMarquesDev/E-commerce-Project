import "./ShopCard.scss";
import type { ReactNode } from "react";
interface ShopCardProps {
  children: ReactNode;
  label?: string;
  flag?: string;
}
function ShopCard({ children, label, flag }: ShopCardProps) {
  return (
    <div className="img-border-radius">
      {children}
      {label}
      <img src={flag} alt="" />
    </div>
  );
}
export default ShopCard;
