import styles from "./ProductItem.module.css";

// Spans (not divs) inside, so the row is not affected by container styles
// like OrderDetails' `.order-details div` rule.
const ProductItem = ({ productInfo }) => {
  const { product, quantity } = productInfo;

  // Past orders keep products that have since been deleted.
  if (!product) {
    return (
      <div className={styles["checkout-item"]}>
        <span className={styles["thumb"]} aria-hidden="true">
          <i className="fa-solid fa-box-open"></i>
        </span>
        <span className={styles["info"]}>
          <span className={styles["name"]}>Product no longer available</span>
          <span className={styles["meta"]}>Qty {quantity}</span>
        </span>
      </div>
    );
  }

  const unitPrice = product.hasPromoPrice ? product.promoPrice : product.price;

  return (
    <div className={styles["checkout-item"]}>
      <span className={styles["thumb"]}>
        <img src={product.mainImage} alt={product.name} />
      </span>
      <span className={styles["info"]}>
        <span className={styles["name"]}>{product.name}</span>
        <span className={styles["meta"]}>
          Qty {quantity} &middot; ${unitPrice.toFixed(2)} each
        </span>
      </span>
      <p className={styles["price"]}>${(unitPrice * quantity).toFixed(2)}</p>
    </div>
  );
};

export default ProductItem;
