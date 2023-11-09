import styles from "./Aside.module.css";

const ShoppingCartExpanded = ({ onClick }) => {
  return (
    <aside className={styles["cart-aside"]}>
      <div onClick={onClick}>
        <i className="fa-solid fa-x"></i>
      </div>
      <div className={styles["cart-item-container"]}>
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
      <button>
        <i className="fa-solid fa-cart-shopping"></i>
        View Cart
      </button>
    </aside>
  );
};

export default ShoppingCartExpanded;
