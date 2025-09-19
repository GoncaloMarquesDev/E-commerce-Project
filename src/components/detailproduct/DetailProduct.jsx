import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./DetailProduct.scss";
import MoreLikeThis from "../morelikethis/MoreLikeThis";
import { CartContext } from "../../context/CartContext";

function DetailProduct() {
  const { id } = useParams();
  console.log("id", id);
  const [productById, setProductById] = useState(null);

  const { addToCart, quantities, cart } = useContext(CartContext);

  // Quantidade local temporária antes de adicionar ao carrinho
  const [localQuantity, setLocalQuantity] = useState(0);

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

  useEffect(() => {
    setLocalQuantity(quantities[id] || 0);
  }, [id, quantities]);

  if (!productById) return <p>Loading...</p>;

  const inCart = cart.some((item) => item.id === productById.id);

  return (
    <>
      <div className="wrapper-detail">
        <div className="wrapper-detail-product">
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

          <div className="product-info">
            <h2>{productById.title}</h2>
            <p className="price">{productById.price} €</p>
            <p className="description">{productById.description}</p>

            <div className="options">
              <button
                className="btn-black"
                onClick={() => addToCart(productById.id, localQuantity)}
              >
                Add to cart
              </button>

              <button
                className="quantity-btn"
                type="button"
                onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
              >
                -
              </button>

              <input
                className="input-detail"
                type="number"
                min="0"
                value={localQuantity}
                onChange={(e) =>
                  setLocalQuantity(Math.max(0, Number(e.target.value)))
                }
              />

              <button
                className="quantity-btn"
                type="button"
                onClick={() => setLocalQuantity(localQuantity + 1)}
              >
                +
              </button>
            </div>
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
