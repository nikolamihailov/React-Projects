import { useState } from "react";
import ShoppingCartExpanded from "../../../ShoppingCart/ShoppingCartExpanded/ShoppingCartAside";
import styles from "../Icons.module.css";

const ShoppingCartIcon = () => {
  const [isOpen, setIOpen] = useState(false);

  const onClick = () => setIOpen(!isOpen);
  return (
    <>
      <div className={styles["dropdown-container"]}>
        <button
          className={styles["icon-btn"]}
          title="Shopping Cart"
          onClick={onClick}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span>0</span>
        </button>
        {isOpen && (
          <ShoppingCartExpanded onClick={onClick} />
        )}
      </div>
    </>
  );
};
export default ShoppingCartIcon;
