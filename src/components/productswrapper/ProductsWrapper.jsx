import ProductCard from "../categoriescard/CategoriesCard";
import "./ProductsWrapper.scss";

function ProductsWrapper() {
  return (
    <div className="wrapper">
      <h1 className="title_products">Products</h1>
      <div className="cards_wrapper">
        <div className="products_card clothes">
          <ProductCard
            header="1"
            text1="Category"
            text2="Clothes"
          ></ProductCard>
        </div>
        <div className="products_card shoes">
          <ProductCard header="2" text1="Category" text2="Shoes"></ProductCard>
        </div>
        <div className="products_card eletronics">
          <ProductCard
            header="3"
            text1="Category"
            text2="Eletronics"
          ></ProductCard>
        </div>
        <div className="products_card furniture">
          <ProductCard
            header="4"
            text1="Category"
            text2="Furniture"
          ></ProductCard>
        </div>
      </div>
    </div>
  );
}
export default ProductsWrapper;
