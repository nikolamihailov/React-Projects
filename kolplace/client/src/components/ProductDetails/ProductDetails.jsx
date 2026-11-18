import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneProduct } from "../../data/services/productService";
import styles from "./ProductDetails.module.css";
import CarouselProducts from "../Home/ProductsCarousel/CarouselContainer/Carousel";
import Spinner from "../Spinner/Spinner";
import useTitle from "../../hooks/useTitle";
import useProductActions from "../../hooks/useProductActions";
import ReviewsContainer from "./Reviews/ReviewsContainer/ReviewsContainer";
import StarRating from "../StarRating/StarRating";
import { averageRating } from "../../utils/rating";

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, isFavourite, toggleFavourite } = useProductActions();
  useTitle(`${product?.name ? product.name : "Product Details"} | KolPlace`);

  useEffect(() => {
    setIsLoading(true);
    getOneProduct(id)
      .then((data) => {
        setProduct(data);
        setActiveImage(data.mainImage);
        window.scrollTo(0, 0);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  const scrollToReviews = useCallback(() => {
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const updateProduct = useCallback((data) => setProduct(data), []);

  if (isLoading || !product) {
    return (
      <section className={styles["product-details"]}>
        <Spinner />
      </section>
    );
  }

  const images = [product.mainImage, product.imageTwo, product.imageThree, product.imageFour].filter(Boolean);
  const rating = averageRating(product.reviews);
  const reviewCount = product.reviews.length;
  const discount = product.hasPromoPrice
    ? Math.round(((product.price - product.promoPrice) / product.price) * 100)
    : 0;
  const favourite = isFavourite(product._id);

  return (
    <section className={styles["product-details"]}>
      <div className={styles["product"]}>
        <div className={styles["gallery"]}>
          <div className={styles["main-image"]}>
            <img src={activeImage} alt={product.name} />
            {discount > 0 && <span className={styles["badge"]}>-{discount}%</span>}
          </div>
          {images.length > 1 && (
            <div className={styles["thumbnails"]} role="group" aria-label="Product images">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`${styles["thumbnail"]} ${src === activeImage ? styles["active"] : ""}`}
                  onClick={() => setActiveImage(src)}
                  aria-label={`Show image ${i + 1} of ${images.length}`}
                  aria-pressed={src === activeImage}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles["info"]}>
          <Link to={`/categories/${product.category.name.toLowerCase()}`} className={styles["category"]}>
            {product.category.name}
          </Link>
          <h1>{product.name}</h1>

          <button type="button" className={styles["rating"]} onClick={scrollToReviews}>
            {reviewCount > 0 ? (
              <>
                <StarRating value={rating} size="lg" />
                <span>
                  {rating.toFixed(1)} · {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                </span>
              </>
            ) : (
              <span>No reviews yet · be the first to review</span>
            )}
          </button>

          <div className={styles["purchase"]}>
            <div className={styles["price"]}>
              {product.hasPromoPrice ? (
                <>
                  <span className={`${styles["current"]} ${styles["sale"]}`}>{formatPrice(product.promoPrice)}</span>
                  <s className={styles["old"]}>{formatPrice(product.price)}</s>
                  <span className={styles["saving"]}>You save {formatPrice(product.price - product.promoPrice)}</span>
                </>
              ) : (
                <span className={styles["current"]}>{formatPrice(product.price)}</span>
              )}
            </div>
            <div className={styles["actions"]}>
              <button type="button" className={styles["add"]} onClick={() => addToCart(product)}>
                <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
                Add to cart
              </button>
              <button
                type="button"
                className={`${styles["favourite"]} ${favourite ? styles["is-favourite"] : ""}`}
                onClick={() => toggleFavourite(product)}
                aria-pressed={favourite}
              >
                <i className={`${favourite ? "fa-solid" : "fa-regular"} fa-heart`} aria-hidden="true"></i>
                {favourite ? "In favourites" : "Add to favourites"}
              </button>
            </div>
          </div>

          <div className={styles["description"]}>
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      <ReviewsContainer productId={product._id} reviews={product.reviews} updateProduct={updateProduct} />

      <CarouselProducts items={4} category={product.category.name} title="People Also Viewed" id={product._id} />
    </section>
  );
};

export default ProductDetails;
