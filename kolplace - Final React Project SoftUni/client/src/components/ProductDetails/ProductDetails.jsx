import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneProduct } from "../../data/services/productService";
import styles from "./ProductDetails.module.css";
import CarouselProducts from "../Home/ProductsCarousel/CarouselContainer/Carousel";
import Spinner from "../Spinner/Spinner";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../contexts/AuthContext";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { NotifContext } from "../../contexts/NotificationContext";
import { FavouriteProductsContext } from "../../contexts/FavouriteProductsContext";
import ReviewsContainer from "./Reviews/ReviewsContainer/ReviewsContainer";
import ProductRating from "./Reviews/ProductRating/ProductRating";

const ProductDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const { cart, addProductToCart } = useContext(ShoppingCartContext);
  const { canAddProduct, addProductToFavouriteProducts } = useContext(
    FavouriteProductsContext
  );
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  const [product, setProduct] = useState(null);
  useTitle(`${product?.name ? product.name : "Product Details"} | KolPlace`);
  useEffect(() => {
    getOneProduct(id)
      .then((data) => {
        setProduct(data);
        setActiveImage(data.mainImage);
        setIsLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const scrollToReviews = useCallback(() => {
    const reviews = document.getElementById("reviews");

    if (reviews) {
      const topPosition = reviews.offsetTop;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  }, []);

  const updateProduct = useCallback((data) => {
    setProduct(data);
  }, []);

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
              {product && (
                <ProductRating
                  reviews={product.reviews}
                  scrollToReviews={scrollToReviews}
                />
              )}
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
                <div className={styles["prices"]}>
                  <p
                    style={
                      product?.hasPromoPrice
                        ? { textDecoration: "line-through", fontSize: "17px" }
                        : { textDecoration: "none" }
                    }
                  >
                    ${product?.price.toFixed(2)}
                  </p>
                  {product?.hasPromoPrice && (
                    <p className={styles["promo-price"]}>
                      ${product?.promoPrice.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className={styles["btns"]}>
                  <button
                    title="Add To Cart"
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
                    Add to cart <i className="fa-solid fa-cart-shopping"></i>
                  </button>

                  {!isAuthenticated ? (
                    <p
                      onClick={() => {
                        updateNotifs([
                          {
                            text: "You need to be signed in to add to favourite products!",
                            type: "error",
                          },
                        ]);
                        navigateTo("/login");
                      }}
                      title="Add To Favourite Products"
                    >
                      Add To Favourites <i className="fa-regular fa-heart"></i>
                    </p>
                  ) : isAuthenticated && canAddProduct(product?._id) ? (
                    <p
                      onClick={() => {
                        addProductToFavouriteProducts(product._id);
                        updateNotifs([
                          {
                            text: `${product?.name} added to favourites!`,
                            type: "success",
                          },
                        ]);
                      }}
                      title="Add To Favourite Products"
                    >
                      Add To Favourites <i className="fa-regular fa-heart"></i>
                    </p>
                  ) : (
                    <p title="Product is in Favourites">
                      Product is in Favourites{" "}
                      <i className="fa-solid fa-heart"></i>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ReviewsContainer
            productId={product?._id}
            reviews={product?.reviews}
            updateProduct={updateProduct}
          />

          <CarouselProducts
            items={4}
            category={product?.category.name}
            title={`People Also Viewed`}
            id={product?._id}
          />
        </>
      )}
    </section>
  );
};

export default ProductDetails;
