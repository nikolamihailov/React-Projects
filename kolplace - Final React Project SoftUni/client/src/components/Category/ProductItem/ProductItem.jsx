import { Link } from "react-router-dom";
import styles from "./ProductItem.module.css";
import { motion } from "framer-motion";

const ProductItem = ({
  _id,
  name,
  mainImage,
  price,
  hasPromoPrice,
  promoPrice,
  category,
}) => {
  const discountInPercentage = Math.ceil(((price - promoPrice) / price) * 100);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{
        scale: 1.03,
        y: -20,
        transition: { duration: 0.6 },
      }}
      className={styles["category-product-item"]}
    >
      {hasPromoPrice && (
        <span className={styles["discount"]}>
          {`-${discountInPercentage}%`}
        </span>
      )}
      <Link to={`/products/${_id}`}>
        <img src={mainImage} alt={name} />
      </Link>
      <Link to={`/products/${_id}`}>
        <h2>{name}</h2>
      </Link>
      <span>{category.name}</span>
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
        {hasPromoPrice && (
          <p className={styles["promo-price"]}>${promoPrice.toFixed(2)}</p>
        )}
      </div>
      <button>
        Buy <i className="fa-solid fa-cart-shopping"></i>{" "}
      </button>
    </motion.div>
  );
};

export default ProductItem;
