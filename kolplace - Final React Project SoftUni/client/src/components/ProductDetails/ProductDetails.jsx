import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneProduct } from "../../data/services/productService";
import styles from "./ProductDetails.module.css";
import CarouselProducts from "../Home/ProductsCarousel/CarouselContainer/Carousel";
import Spinner from "../Spinner/Spinner";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../contexts/AuthContext";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { NotifContext } from "../../contexts/NotificationContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const { cart, addProductToCart } = useContext(ShoppingCartContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  const [product, setProduct] = useState(null);
  useTitle(`${product?.name} | KolPlace`);
  useEffect(() => {
    window.scrollTo(0, 0);
    getOneProduct(id)
      .then((data) => {
        setProduct(data);
        setActiveImage(data.mainImage);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <section className={styles["product-details"]}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles["product"]}>
            <div className={styles["product-images"]}>
              <div className={styles["main-image"]}>
                <img src={activeImage} alt={product?.name} />
              </div>
              <div className={styles["other-images"]}>
                <img
                  src={product?.mainImage}
                  alt={product?.name}
                  onClick={() => setActiveImage(product.mainImage)}
                  className={
                    activeImage === product?.mainImage
                      ? styles["active-image"]
                      : styles["non-active-image"]
                  }
                />
                {product?.imageTwo && (
                  <img
                    src={product?.imageTwo}
                    alt={product?.name}
                    onClick={() => setActiveImage(product.imageTwo)}
                    className={
                      activeImage === product?.imageTwo
                        ? styles["active-image"]
                        : styles["non-active-image"]
                    }
                  />
                )}
                {product?.imageThree && (
                  <img
                    src={product?.imageThree}
                    alt={product?.name}
                    onClick={() => setActiveImage(product.imageThree)}
                    className={
                      activeImage === product?.imageThree
                        ? styles["active-image"]
                        : styles["non-active-image"]
                    }
                  />
                )}
                {product?.imageFour && (
                  <img
                    src={product?.imageFour}
                    alt={product?.name}
                    onClick={() => setActiveImage(product.imageFour)}
                    className={
                      activeImage === product?.imageFour
                        ? styles["active-image"]
                        : styles["non-active-image"]
                    }
                  />
                )}
              </div>
            </div>
            <div className={styles["product-info"]}>
              <h1>{product?.name}</h1>
              <p>
                <strong>Category:</strong>
                <Link
                  to={`/categories/${product?.category.name.toLowerCase()}`}
                >
                  <span>{product?.category.name}</span>
                </Link>
              </p>
              <p>
                <strong>Description:</strong>
                {product?.description}
              </p>
              <div className={styles["product-prices-buttons"]}>
                <p>${product?.price.toFixed(2)}</p>
                {product?.hasPromoPrice && (
                  <p>${product?.promoPrice.toFixed(2)}</p>
                )}
                <button
                  onClick={() => {
                    if (isAuthenticated) {
                      addProductToCart(product);
                      const isIn = cart.products.find(
                        (p) => p.product._id === product?._id
                      );
                      if (isIn)
                        updateNotifs([
                          {
                            text: `Product already in cart, quantity increased!`,
                            type: "success",
                          },
                        ]);
                      else
                        updateNotifs([
                          {
                            text: `${product?.name} added to cart!`,
                            type: "success",
                          },
                        ]);
                    } else {
                      updateNotifs([
                        {
                          text: "You need to be signed in to buy products!",
                          type: "error",
                        },
                      ]);
                      navigateTo("/login");
                    }
                  }}
                >
                  Buy <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <CarouselProducts
        items={4}
        category={product?.category.name}
        title={`People Also Viewed`}
        id={product?._id}
      />
    </section>
  );
};

export default ProductDetails;
