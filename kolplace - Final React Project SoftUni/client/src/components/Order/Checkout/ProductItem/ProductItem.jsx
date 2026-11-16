import styles from "./ProductItem.module.css";

const ProductItem = ({ productInfo }) => {
  const { product, quantity } = productInfo;

  // Past orders keep products that have since been deleted.
  if (!product) {
    return (
      <div className={styles["checkout-item"]}>
        <h4>Product no longer available</h4>
        <span>X{quantity}</span>
      </div>
    );
  }

  return (
    <div className={styles["checkout-item"]}>
      <img src={product.mainImage} alt={product.name} />
      <h4>{product.name}</h4>
      <span>X{quantity}</span>
      <p>
        $
        {product.hasPromoPrice
          ? product.promoPrice.toFixed(2)
          : product.price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductItem;
