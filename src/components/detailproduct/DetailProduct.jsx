import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./DetailProduct.scss";
import MoreLikeThis from "../morelikethis/MoreLikeThis";
import { CartContext } from "../../context/CartContext";



function DetailProduct() {
  

  const { id } = useParams();
  const [productById, setProductById] = useState(null);

  const { addToCart, quantities, setQuantities } = useContext(CartContext);

  const moreLikeThis = productById?.category?.id;
  console.log("moreLikeThis no detail", moreLikeThis);

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

  if (!productById) return <p>Loading...</p>;

  return (
    <>
      {" "}
      <div className="wrapper-detail">
        <div className="wrapper-detail-product">
          {/* coluna da esquerda: imagens */}
          <div className="product-images">
            <div className="thumbnails">
              {productById.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${productById.title} ${index}`}
                />
              ))}
            </div>
            <div className="main-image">
              <img
                src={productById.category.image}
                alt={productById.category.name}
              />
            </div>
          </div>

          {/* coluna da direita: informações */}
          <div className="product-info">
            <h2>{productById.title}</h2>
            <p className="price">{productById.price} €</p>
            <div className="rating">⭐⭐⭐⭐⭐</div>
            <p className="description">{productById.description}</p>
            <div className="options">
              {/* <button className="btn-red">Comprar</button> */}{" "}
              {/* ver se vale a pena este botao */}
              {productById && (
                <button
                  className="btn-black"
                  onClick={() =>
                    addToCart(productById.id, quantities[productById.id] || 1)
                  }
                >
                  Adicionar ao carrinho
                </button>
              )}
            </div>
            <label>Quantidade:</label>
            <input
              className="input-detail"
              type="number"
              min="1"
              value={quantities[productById.id] || 1} // valor atual ou 1 por default
              onChange={(e) =>
                setQuantities((prev) => ({
                  ...prev,
                  [productById.id]: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
      </div>
      <div className="more-wrapper">
        <div className="more">
          {productById?.category?.id && (
            <MoreLikeThis categoryId={productById.category.id} />
          )}
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
