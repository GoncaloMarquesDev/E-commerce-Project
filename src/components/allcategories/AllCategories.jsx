import { useEffect, useState } from "react";
import "../allcategories/AllCategories.scss";

import { Link } from "react-router";
import ProductCard from "../productcard/ProductCard";

function AllCategories() {
  /*  const [currentCurrency, setCurrentCurrency] = useState("eur");
  const [countries, setCountries] = useState([]); */
  const [allProducts, setAllProducts] = useState([]);
  console.log("allProducts", allProducts);

  useEffect(() => {


    const fetchAllProducts = async () => {
      const data = await fetch(`https://api.escuelajs.co/api/v1/products`);
      const allproducts = await data.json();
      console.log(allproducts);
      setAllProducts(allproducts);
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="wrapper-products">
      <h2>All Products</h2>
      <div className="grid-4-categories">
        {allProducts.map((product) => {
          return (
            <Link to={`/detail/${product.id}`} key={product.id}>
              <ProductCard
                imgSrc={product.category.image}
                itemName={product.title}
                price={product.price}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default AllCategories;
