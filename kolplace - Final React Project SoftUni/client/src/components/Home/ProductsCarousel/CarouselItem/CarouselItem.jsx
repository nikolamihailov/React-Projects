import { Link, useNavigate } from "react-router-dom";
import styles from "./CarouselItem.module.css";
import { motion } from "framer-motion";
import { useCallback, useContext } from "react";
import { ShoppingCartContext } from "../../../../contexts/ShoppingCartContext";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";

const CaroueselProductItem = ({
  _id,
  name,
  mainImage,
  price,
  hasPromoPrice,
  promoPrice,
  category,
  reviews,
}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { cart, addProductToCart } = useContext(ShoppingCartContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  const discountInPercentage = Math.ceil(((price - promoPrice) / price) * 100);
  const product = {
    _id,
    name,
    mainImage,
    price,
    hasPromoPrice,
    promoPrice,
    category,
  };

  const calculateRating = useCallback((reviews) => {
    const totalRating = reviews.reduce((acc, rev) => {
      return acc + rev.rating;
    }, 0);
    const avgRating = totalRating / reviews.length;

    const stars = Array.from({ length: Math.round(avgRating) }, () => (
      <i key={uuidv4()} className="fa-solid fa-star"></i>
    ));

    for (let i = 0; i < 5 - Math.round(avgRating); i++) {
      stars.push(<i key={uuidv4()} className="fa-regular fa-star"></i>);
    }

    if (reviews.length === 0) {
      const starsNoReviews = Array.from({ length: 5 }, () => (
        <i key={uuidv4()} className="fa-regular fa-star"></i>
      ));
      return (
        <div className={styles["ratings"]}>
          <div>
            {starsNoReviews} <p>(0)</p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles["ratings"]}>
        <div>
          {stars} <p>({reviews.length})</p>
        </div>
      </div>
    );
  }, []);

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -10,
        transition: { duration: 0.6 },
      }}
      className={styles["carousel-product-item"]}
    >
      {hasPromoPrice && <span className={styles["discount"]}>{`-${discountInPercentage}%`}</span>}
      <Link to={`/products/${_id}`}>
        <img src={mainImage} alt={name} />
      </Link>
      <Link to={`/products/${_id}`}>
        <h2>{name.length > 45 ? name.slice(0, 41) + " ..." : name}</h2>
      </Link>
      {reviews && calculateRating(reviews)}
      <Link to={`/categories/${category.name.toLowerCase()}`}>
        <span>{category.name}</span>
      </Link>
      <div className={styles["prices"]}>
        <p
          style={
            hasPromoPrice
              ? { textDecoration: "line-through", fontSize: "13px" }
              : { textDecoration: "none" }
          }
        >
          ${price.toFixed(2)}
        </p>
        {hasPromoPrice && <p className={styles["promo-price"]}>${promoPrice.toFixed(2)}</p>}
      </div>
      <button
        onClick={() => {
          if (isAuthenticated) {
            addProductToCart(product);
            const isIn = cart.products.find((p) => p.product._id === _id);
            if (isIn)
              updateNotifs([
                {
                  text: `Product already in cart, quantity increased!`,
                  type: "success",
                },
              ]);
            else updateNotifs([{ text: `${name} added to cart!`, type: "success" }]);
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
    </motion.div>
  );
};

export default CaroueselProductItem;
