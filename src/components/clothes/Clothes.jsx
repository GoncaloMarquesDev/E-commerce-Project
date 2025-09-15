import { useEffect, useState } from "react";
import "./Clothes.scss";

import { Link, useParams } from "react-router";
import ProductCard from "../productcard/ProductCard";

function Clothes() {
  /*  const [currentCurrency, setCurrentCurrency] = useState("eur");
  const [countries, setCountries] = useState([]); */
  const { id } = useParams();
  console.log("id category", id)
  const [clothes, setClothes] = useState([]);
  console.log("clothes", clothes);

  const categoriesMap= {
  1: "Clothes",
  2: "Electronics",
  3: "Furniture",
  4: "Shoes",
};
  
  

  useEffect(() => {
    if (!id) return;
    const fetchClothes = async () => {
      const data = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${id}/products`
      );
      const clothesList = await data.json();
      console.log(clothesList);
      setClothes(clothesList);
    };
    fetchClothes();
  }, []);

  return(
    <div className="wrapper-clothes">
    <h2 className="title-container">{categoriesMap[id] || "Category"}</h2>
    <div>

    </div>
    <div className="grid-clothes">
      {clothes.map((item) => {
        return (
          <Link to={`/detail/${item.id}`} key={item.id}>
            <ProductCard
              imgSrc={item.category.image}
              itemName={item.title}
              price={item.price}
            />
          </Link>
        );
      })}
    </div>
  </div>
  )
  
}
export default Clothes;
