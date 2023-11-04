import styles from "../Icons.module.css";

const ShoppingCartIcon = () => {
  return (
    <>
      <button
        className={styles["icon-btn"]}
        title="Shopping Cart"
      >
        <i className="fa-solid fa-cart-shopping"></i>
        <span>0</span>
      </button>
    </>
  );
};
export default ShoppingCartIcon;
