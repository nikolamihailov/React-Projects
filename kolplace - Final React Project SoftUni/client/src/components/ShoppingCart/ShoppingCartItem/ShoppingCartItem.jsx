import styles from "./ShoppingCartItem.module.css";

const ShoppingCartItem = ({
  _id,
  name,
  mainImage,
  price,
  removeCartProduct,
}) => {
  return (
    <div className={styles["cart-item"]}>
      <img src={mainImage} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
      <div className={styles["remove"]} onClick={() => removeCartProduct(_id)}>
        <i className="fa-solid fa-trash-can"></i>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
