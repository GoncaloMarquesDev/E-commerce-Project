import { Link } from "react-router";
import ProductCard from "../categoriescard/CategoriesCard";
import "./ProductsWrapper.scss";

function ProductsWrapper() {
  return (
    <div className="products-wrapper">
      <h1 className="title_products">Products</h1>
      <div className="cards_wrapper">
        <div className="products_card clothes">
          <Link to="/category/1">
            <ProductCard header="1" text1="Category" text2="Clothes" />
          </Link>
        </div>
        <div className="products_card shoes">
          <Link to="/category/2">
            <ProductCard
              header="2"
              text1="Category"
              text2="Eletronics"
            ></ProductCard>
          </Link>
        </div>
        <div className="products_card eletronics">
          <Link to="/category/3">
            <ProductCard
              header="3"
              text1="Category"
              text2="Furniture"
            ></ProductCard>
          </Link>
        </div>
        <div className="products_card furniture">
           <Link to="/category/4">
          <ProductCard
            header="4"
            text1="Category"
            text2="Shoes"
          ></ProductCard>
          </Link>
        </div>
        <div className="card invisible"></div>
      </div>
    </div>
  );
}
export default ProductsWrapper;
