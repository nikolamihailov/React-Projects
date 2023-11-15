import { useContext, useState } from "react";
import ShoppingCartExpanded from "../../../ShoppingCart/ShoppingCartExpanded/ShoppingCartAside";
import styles from "../Icons.module.css";
import { AuthContext } from "../../../../contexts/AuthContext";

const ShoppingCartIcon = () => {
  const [isOpen, setIOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const onClick = () => {
    if (isAuthenticated) setIOpen(!isOpen);
  };
  return (
    <>
      <div className={styles["dropdown-container"]}>
        <button
          className={styles["icon-btn"]}
          title="Shopping Cart"
          onClick={onClick}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          {isAuthenticated && <span>0</span>}
        </button>
        {isAuthenticated && isOpen && (
          <ShoppingCartExpanded onClick={onClick} />
        )}
      </div>
    </>
  );
};
export default ShoppingCartIcon;
