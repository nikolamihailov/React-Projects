import styles from "./ProductItem.module.css";

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
    <div className={styles["admin-product-item"]}>
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
          <p className={styles["promo-price"]}>${promoPrice}</p>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
