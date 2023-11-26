import { Link } from "react-router-dom";
import styles from "./CarouselItem.module.css";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ShoppingCartContext } from "../../../../contexts/ShoppingCartContext";

const CaroueselProductItem = ({
  _id,
  name,
  mainImage,
  price,
  hasPromoPrice,
  promoPrice,
  category,
}) => {
  const { addProductToCart } = useContext(ShoppingCartContext);
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
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -10,
        transition: { duration: 0.6 },
      }}
      className={styles["carousel-product-item"]}
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
        <h2>{name.length > 45 ? name.slice(0, 41) + " ..." : name}</h2>
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
      <button onClick={() => addProductToCart(product)}>
        Buy <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </motion.div>
  );
};

export default CaroueselProductItem;
