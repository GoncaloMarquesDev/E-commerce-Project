/* import { Link } from "react-router";
import ProductCard from "../productcard/ProductCard";
import "./MoreLikeThis.scss";
import { useEffect, useRef, useState } from "react";

function MoreLikeThis({ categoryId }) {
  const [moreLikeThis, setMoreLikeThis] = useState([]);
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  const [step, setStep] = useState(210); // fallback (200px + 10px)

  useEffect(() => {
    if (containerRef.current) {
      const card = containerRef.current.querySelector(
        ".card-wrapper-more-like-this"
      );
      if (card) {
        const cardStyles = getComputedStyle(card);
        const containerStyles = getComputedStyle(containerRef.current);

        const cardWidth = parseFloat(cardStyles.width);
        const gap = parseFloat(containerStyles.gap) || 0;
        setStep(cardWidth + gap);
      }
    }
  }, [moreLikeThis]);

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
        console.error("Erro ao buscar produtos da categoria:", error);
      }
    };

    fetchMoreLikeThis();
  }, [categoryId]);

 
  useEffect(() => {
    if (!moreLikeThis.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % moreLikeThis.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [moreLikeThis]);

  if (!moreLikeThis.length) return <p>Loading...</p>;

  return (
    <div className="category-more-like-this">
      <h2>More like this</h2>

      <div ref={containerRef} className="flex-more-like-this">
        
       
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${index * step}px)`,
            transition: "transform 0.7s ease-in-out",
            display: "flex",
          }}
        >
          {moreLikeThis.concat(moreLikeThis).map((item, i) => (
            <Link to={`/detail/${item.id}`} key={i}>
              <div className="card-wrapper-more-like-this">
                <ProductCard
                  imgSrc={item.images?.[0]}
                  itemName={item.title}
                  price={item.price}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoreLikeThis; */

/* versao antiga antes do carrocel */
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
      <h2>More like this</h2>
      <div className="flex-more-like-this">
        <Carousel>
          {moreLikeThis.map((item) => (
            <Link to={`/detail/${item.id}`} key={item.id}>
              <div className="card-wrapper-more-like-this">
                <ProductCard
                  imgSrc={item.images?.[0]}
                  itemName={item.title}
                  price={item.price}
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
