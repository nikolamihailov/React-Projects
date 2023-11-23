import styles from "./ProductItem.module.css";

const ProductItem = ({
  name,
  mainImage,
  category,
  price,
  hasPromoPrice,
  promoPrice,
}) => {
  return (
    <div className={styles["category-product-item"]}>
      <img src={mainImage} alt={name} />
      <h2>{name}</h2>
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
          <p className={styles["promo-price"]}>${promoPrice}</p>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
