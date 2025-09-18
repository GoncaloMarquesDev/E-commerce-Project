import { useEffect, useState } from "react";
import "../allcategories/AllCategories.scss";
/* import "../allcategories/AllCategories.scss"; */
import { Link } from "react-router";
import ProductCard from "../productcard/ProductCard";
import Loader from "../loader/Loader";



function AllCategories() {
 
  const [allProducts, setAllProducts] = useState([]);
  console.log("allProducts", allProducts);
  const [loading, setLoading] = useState(true);
 
/* paginacao */
  const [page, setPage] = useState(1);
  const limit = 10;  

  /* useEffect(() => {


    const fetchAllProducts = async () => {
        const offset = (page - 1) * limit;
      const data = await fetch(`https://fakestoreapi.com/products`
      );
      const allproducts = await data.json();
      console.log(allproducts);
      setAllProducts(allproducts);
    };
    fetchAllProducts();
  }, [page, limit]); */

  useEffect(() => {
  const fetchAllProducts = async () => {
     const offset = (page - 1) * limit;
    setLoading(true);
    try {
      const data = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
      const allproducts = await data.json();
      setAllProducts(allproducts);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchAllProducts();
}, [page, limit]);
  return (
  <div className="wrapper-products">
    <h2 className="title-container-all">All Products</h2>

    {loading ? (
      <Loader />
    ) : (
      <div className="grid-all-categories">
        {allProducts.map((product) => (
          <Link to={`/detail/${product.id}`} key={product.id}>
            <ProductCard
              imgSrc={product.category.image} // ⚠️ aqui é image, não category.image no FakeStoreAPI
              itemName={product.title}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    )}

    <div className="all-products-pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  </div>
);

}
export default AllCategories;
