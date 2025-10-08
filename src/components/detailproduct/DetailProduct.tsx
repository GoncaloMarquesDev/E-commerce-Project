import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./DetailProduct.scss";
import MoreLikeThis from "../morelikethis/MoreLikeThis";
import { CartContext } from "../../context/CartContext";
import type { Product } from "../../types/products";

function DetailProduct() {
  const { id } = useParams<{ id: string }>();
  const [productById, setProductById] = useState<Product | null>(null);

  const { addToCart, quantities } = useContext(CartContext);

  const [localQuantity, setLocalQuantity] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    const fetchProductById = async (): Promise<void> => {
      try {
        const data = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        if (!data.ok) {
          throw new Error("Error searching product");
        }
        const resultProductById: Product = await data.json();
        setProductById(resultProductById);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchProductById();
  }, [id]);

  useEffect(() => {
    if (id && quantities) {
      setLocalQuantity(quantities[id] || 0);
    }
  }, [id, quantities]);

  if (!productById) return <p>Loading...</p>;

  return (
    <>
      <div className="wrapper-detail">
        <div className="wrapper-detail-product">
          <div className="product-images">
            <div className="thumbnails">
              {productById.images.length > 0 ? (
                productById.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${productById.title} ${index}`}
                  />
                ))
              ) : (
                <img src="/placeholder.png" alt="No image available" />
              )}
            </div>
            <div className="main-image">
              <img
                src={productById.images[0] || "/placeholder.png"}
                alt={productById.title}
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
                onClick={() => addToCart(String(productById.id), localQuantity)}
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
