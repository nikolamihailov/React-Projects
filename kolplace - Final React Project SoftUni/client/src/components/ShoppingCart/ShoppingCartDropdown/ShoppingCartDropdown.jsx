import styles from "./Dropdown.module.css";

const ShoppingCartDropdown = () => {
  return (
    <div className={styles["cart-dropdown"]}>
      <div className={styles["cart-item"]}>
        <img
          src="https://smartphone.bg/system/images/421908/original/mtv73rxa.png"
          alt=""
        />
        <h4>Ihone 15 Pro Max</h4>
        <p>$999</p>
      </div>
      <div className={styles["cart-item"]}>
        <img
          src="https://smartphone.bg/system/images/421908/original/mtv73rxa.png"
          alt=""
        />
        <h4>Ihone 15 Pro Max</h4>
        <p>$999</p>
      </div>
    </div>
  );
};

export default ShoppingCartDropdown;
