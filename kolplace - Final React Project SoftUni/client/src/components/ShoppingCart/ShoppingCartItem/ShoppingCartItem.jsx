import styles from "./ShoppingCartItem.module.css";

const ShoppingCartItem = ({ name, mainImage, price }) => {
  return (
    <div className={styles["cart-item-container"]}>
      <div className={styles["cart-item"]}>
        <img src={mainImage} alt={name} />
        <h4>{name}</h4>
        <p>${price}</p>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
