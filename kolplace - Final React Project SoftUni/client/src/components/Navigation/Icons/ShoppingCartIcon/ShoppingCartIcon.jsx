import { useCallback, useContext, useState } from "react";
import styles from "../Icons.module.css";
import { AuthContext } from "../../../../contexts/AuthContext";
import { ShoppingCartContext } from "../../../../contexts/ShoppingCartContext";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import ShoppingCartExpanded from "../../../ShoppingCart/ShoppingCartAside/ShoppingCartAside";

const ShoppingCartIcon = () => {
  const [isOpen, setIOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { cart } = useContext(ShoppingCartContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  const onOpen = useCallback(() => setIOpen(!isOpen), [isOpen]);

  return (
    <>
      <div className={styles["dropdown-container"]}>
        <button
          className={styles["icon-btn"]}
          title="Shopping Cart"
          onClick={() => {
            if (isAuthenticated) {
              setIOpen(!isOpen);
            } else {
              updateNotifs([
                {
                  text: "You need to be signed in to view shopping cart!",
                  type: "error",
                },
              ]);
              navigateTo("/login");
            }
          }}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          {isAuthenticated && (
            <span>{cart.products?.length > 0 ? cart.products?.length : 0}</span>
          )}
        </button>
        {isAuthenticated && isOpen && <ShoppingCartExpanded onClose={onOpen} />}
      </div>
    </>
  );
};
export default ShoppingCartIcon;
