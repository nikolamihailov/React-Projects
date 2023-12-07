import styles from "./ProductItem.module.css";

const ProductItem = ({ productInfo }) => {
  const { product, quantity } = productInfo;

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
