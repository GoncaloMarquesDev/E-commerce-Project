import { useEffect, useState } from "react";
import "../allcategories/AllCategories.scss";
/* import "../allcategories/AllCategories.scss"; */
import { Link } from "react-router";
import ProductCard from "../productcard/ProductCard";
import Loader from "../loader/Loader";
import type { Product } from "../../types/products";

function AllCategories() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  console.log("allProducts", allProducts);
  const [loading, setLoading] = useState<boolean>(true);

  /* paginacao */
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  useEffect(() => {
    const fetchAllProducts = async (): Promise<void> => {
      const offset = (page - 1) * limit;
      setLoading(true);
      try {
        const data = await fetch(
          `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
        );
        const allproducts: Product[] = await data.json();
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
          {allProducts.map((product: Product) => (
            <Link to={`/detail/${product.id}`} key={product.id}>
              <ProductCard
                imgSrc={product.images?.[0] || "/placeholder.png"}
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
