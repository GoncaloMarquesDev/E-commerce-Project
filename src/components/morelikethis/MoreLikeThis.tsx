import { Link } from "react-router";
import ProductCard from "../productcard/ProductCard";
import "./MoreLikeThis.scss";
import { useEffect, useState } from "react";
import Carousel from "../carousel/Carousel";
import Loader from "../loader/Loader";
import type { Product } from "../../types/products";

interface MoreLikeThisProps {
  categoryId: number;
}

function MoreLikeThis({ categoryId }: MoreLikeThisProps) {
  const [moreLikeThis, setMoreLikeThis] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchMoreLikeThis = async () => {
      setLoading(true);
      try {
        const data = await fetch(
          `https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}`
        );
        const resultMore: Product[] = await data.json();
        setMoreLikeThis(resultMore);
      } catch (error) {
        console.error("Error searching category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreLikeThis();
  }, [categoryId]);

  if (loading) return <Loader />;

  return (
    <div className="category-more-like-this">
      <h2>Related</h2>
      <div className="flex-more-like-this">
        <Carousel interval={2500}>
          {moreLikeThis.map((item) => (
            <Link to={`/detail/${item.id}`} key={item.id}>
              <div className="card-wrapper-more-like-this">
                <ProductCard
                  imgSrc={item.images?.[0] || "/placeholder.png"}
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
