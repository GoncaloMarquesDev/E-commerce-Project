import { useEffect, useState } from "react";
import "../allcategories/AllCategories.scss";

import { Link } from "react-router";
import ProductCard from "../productcard/ProductCard";
import Clothes from "../clothes/Clothes";

function AllCategories() {
  /*  const [currentCurrency, setCurrentCurrency] = useState("eur");
  const [countries, setCountries] = useState([]); */
  const [allProducts, setAllProducts] = useState([]);
  console.log("allProducts", allProducts);
 
/* paginacao */
  const [page, setPage] = useState(1);
  const limit = 10;  

  useEffect(() => {


    const fetchAllProducts = async () => {
        const offset = (page - 1) * limit;
      const data = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      const allproducts = await data.json();
      console.log(allproducts);
      setAllProducts(allproducts);
    };
    fetchAllProducts();
  }, [page, limit]);

  return (
    <div className="wrapper-products">
      <h2>All Products</h2>
      <div className="grid-4-all-categories">
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
      <div className="all-products-pagination">
         {/* Controlo de paginação */}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
   
      </div>
      
    </div>
  );
}
export default AllCategories;
