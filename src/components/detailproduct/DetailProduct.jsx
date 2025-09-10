import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./DetailProduct.scss";

function DetailProduct() {
  const { id } = useParams();

  const [productById, setProductById] = useState(null);
  console.log("productById", productById);

 const moreLikeThis = productById?.category?.id;
console.log("morelikethis", moreLikeThis);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const data = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        const resultProductById = await data.json();
        setProductById(resultProductById);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchProductById();
  }, [id]);

  if (!productById) return <p>Loading</p>;

  return (
    <div className="wrapper-detail">
      <div className="wrapper-detail-product">
        {/* coluna da esquerda: imagens */}
        <div className="product-images">
          <div className="thumbnails">
            <img src={productById.images[0]} alt={productById.title} />
            <img src={productById.images[1]} alt={productById.title} />
            <img src={productById.images[2]} alt={productById.title} />
          </div>
          <div className="main-image">
            <img src={productById.category.image} alt="" />
          </div>
        </div>

        {/* coluna da direita: informações */}
        <div className="product-info">
          <h2>{productById.title}</h2>
          <p className="price">{productById.price}$</p>
          <div className="rating">⭐⭐⭐⭐⭐</div>
          <p className="description">{productById.description}</p>
          <div className="options">
            <button className="btn-red">Comprar</button>
          <button className="btn-black">Adicionar ao carrinho</button>
            
          </div>
          <label>Quantidade:</label>
            <input type="number" value="1" min="1" />
        </div>
      </div>
      <div className="like-this-one">
        more  products like this one
      </div>
    </div>
  );
}

export default DetailProduct;
