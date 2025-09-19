import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import "./Categories.scss";

import { Link, useParams } from "react-router";
import ProductCard from "../productcard/ProductCard";

function Categories() {
  const { id } = useParams();
  console.log("id categories");
  console.log("id category", id);
  const [clothes, setClothes] = useState([]);
  console.log("clothes", clothes);
  const [loading, setLoading] = useState(true);

  const categoriesMap = {
    1: "Clothes",
    2: "Electronics",
    3: "Furniture",
    4: "Shoes",
  };

  useEffect(() => {
    if (!id) return;

    const fetchClothes = async () => {
      setLoading(true);
      try {
        const data = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${id}/products`
        );
        const clothesList = await data.json();
        setClothes(clothesList);
      } catch (error) {
        console.error("Erro ao buscar produtos da categoria:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, [id]);

  return (
    <div className="wrapper-clothes">
      <h2 className="title-container">{categoriesMap[id] || "Category"}</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid-clothes">
          {clothes.map((item) => (
            <Link to={`/detail/${item.id}`} key={item.id}>
              <ProductCard
                imgSrc={item.category.image}
                itemName={item.title}
                price={item.price}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
export default Categories;
