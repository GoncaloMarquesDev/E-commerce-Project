import { Link } from "react-router";
import ProductCard from "../productcard/ProductCard";
import "./MoreLikeThis.scss";
import { useEffect, useState } from "react";
import Carousel from "../carousel/Carousel";

function MoreLikeThis({ categoryId }) {
  const [moreLikeThis, setMoreLikeThis] = useState([]);
  console.log("moreLikeThis", moreLikeThis);

  useEffect(() => {
    if (!categoryId) return;

    const fetchMoreLikeThis = async () => {
      try {
        const data = await fetch(
          `https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}`
        );
        const resultMore = await data.json();
        setMoreLikeThis(resultMore);
      } catch (error) {
        console.error("Error searching category:", error);
      }
    };

    fetchMoreLikeThis();
  }, [categoryId]);

  if (!moreLikeThis.length) return <p>Loading...</p>;

  return (
    <div className="category-more-like-this">
      <h2>Related</h2>
      <div className="flex-more-like-this">
        <Carousel>
          {moreLikeThis.map((item) => (
            <Link to={`/detail/${item.id}`} key={item.id}>
              <div className="card-wrapper-more-like-this">
                <ProductCard
                  imgSrc={item.images?.[0]}
                  itemName={item.title}
                  price={item.price}
                  noHover
                />
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default MoreLikeThis;
