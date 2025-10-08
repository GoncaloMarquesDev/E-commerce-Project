import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import "./Categories.scss";

import { Link, useParams } from "react-router";
import ProductCard from "../productcard/ProductCard";
import type { Product } from "../../types/products";

function Categories() {
  const { id } = useParams<{ id: string }>();
  console.log("id categories");
  console.log("id category", id);
  const [clothes, setClothes] = useState<Product[]>([]);
  console.log("clothes", clothes);
  const [loading, setLoading] = useState<boolean>(true);

  const categoriesMap: Record<string, string> = {
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
        const clothesList: Product[] = await data.json();
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
      <h2 className="title-container">
        {categoriesMap[id || ""] || "Category"}
      </h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid-clothes">
          {clothes.map((item: Product) => (
            <Link to={`/detail/${item.id}`} key={item.id}>
              <ProductCard
                imgSrc={item.images?.[0] || "/placeholder.png"}
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
