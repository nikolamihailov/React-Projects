import styles from "../Icons.module.css";

const ShoppingCartIcon = () => {
  return (
    <>
      <button
        className={styles["icon-btn"]}
        title="Shopping Cart"
      >
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </>
  );
};
export default ShoppingCartIcon;
