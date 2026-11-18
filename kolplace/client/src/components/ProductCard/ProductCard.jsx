import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import StarRating from "../StarRating/StarRating";
import { averageRating } from "../../utils/rating";
import useProductActions from "../../hooks/useProductActions";

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

// The one product card used across the shop: category pages, promotions,
// search results, favourites and the home/product carousels.
const ProductCard = ({ className = "", ...product }) => {
  const { _id, name, mainImage, price, hasPromoPrice, promoPrice, category, reviews = [] } = product;
  const { addToCart, isFavourite, toggleFavourite } = useProductActions();
  const favourite = isFavourite(_id);
  const url = `/products/${_id}`;
  const discount = hasPromoPrice ? Math.round(((price - promoPrice) / price) * 100) : 0;
  const rating = averageRating(reviews);

  return (
    <article className={`${styles["card"]} ${className}`}>
      <Link to={url} className={styles["media"]} tabIndex={-1} aria-hidden="true">
        <img src={mainImage} alt="" loading="lazy" />
      </Link>

      {discount > 0 && <span className={styles["badge"]}>-{discount}%</span>}

      <button
        type="button"
        className={`${styles["favourite"]} ${favourite ? styles["is-favourite"] : ""}`}
        onClick={() => toggleFavourite(product)}
        aria-pressed={favourite}
        aria-label={favourite ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
        title={favourite ? "Remove from favourites" : "Add to favourites"}
      >
        <i className={`${favourite ? "fa-solid" : "fa-regular"} fa-heart`} aria-hidden="true"></i>
      </button>

      <div className={styles["body"]}>
        {category?.name && (
          <Link to={`/categories/${category.name.toLowerCase()}`} className={styles["category"]}>
            {category.name}
          </Link>
        )}

        <h3 className={styles["title"]}>
          <Link to={url} title={name}>
            {name}
          </Link>
        </h3>

        <div className={styles["rating"]}>
          {reviews.length > 0 ? (
            <>
              <StarRating value={rating} />
              <span className={styles["score"]}>
                {rating.toFixed(1)} ({reviews.length})
              </span>
            </>
          ) : (
            <span>No reviews yet</span>
          )}
        </div>

        <div className={styles["footer"]}>
          <div className={styles["price"]}>
            {hasPromoPrice ? (
              <>
                <span className={styles["current"]}>{formatPrice(promoPrice)}</span>
                <s className={styles["old"]} aria-label={`was ${formatPrice(price)}`}>
                  {formatPrice(price)}
                </s>
              </>
            ) : (
              <span className={styles["current"]}>{formatPrice(price)}</span>
            )}
          </div>
          <button type="button" className={styles["add"]} onClick={() => addToCart(product)}>
            <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
