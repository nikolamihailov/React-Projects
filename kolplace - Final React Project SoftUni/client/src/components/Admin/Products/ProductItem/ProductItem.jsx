import styles from "./ProductItem.module.css";
import { motion } from "framer-motion";

const ProductItem = ({
  _id,
  name,
  mainImage,
  price,
  openEdit,
  openDelete,
  hasPromoPrice,
  promoPrice,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles["admin-product-item"]}
    >
      <div>
        <button onClick={() => openEdit(_id)} title={"Edit Item"}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={() => openDelete(_id)} title={"Delete Item"}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <img src={mainImage} alt={name} />
      <h2>{name}</h2>
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
    </motion.div>
  );
};

export default ProductItem;
