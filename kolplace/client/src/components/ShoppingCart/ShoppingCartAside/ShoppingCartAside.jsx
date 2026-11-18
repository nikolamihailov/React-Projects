import { useContext, useEffect } from "react";
import styles from "./Aside.module.css";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import ShoppingCartItem from "./ShoppingCartItem/ShoppingCartItem";
import { Link } from "react-router-dom";

const ShoppingCartExpanded = ({ onClose }) => {
  const { cart, emptyCartProducts } = useContext(ShoppingCartContext);
  const hasProducts = cart?.products.length > 0;
  const itemCount =
    cart?.products.reduce((count, p) => count + Number(p.quantity), 0) ?? 0;

  // Escape closes the cart, like the close button and the backdrop.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <aside
        className={styles["cart-aside"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-aside-title"
      >
        <div className={styles["head"]}>
          <h2 id="cart-aside-title">
            Your cart
            {hasProducts && (
              <span className={styles["count"]}>
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            )}
          </h2>
          <button
            type="button"
            className={styles["close"]}
            onClick={onClose}
            aria-label="Close cart"
            autoFocus
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className={styles["body"]}>
          {hasProducts ? (
            <ul className={styles["items"]}>
              {cart?.products.map((p) => {
                return (
                  <ShoppingCartItem
                    key={p.product._id}
                    productInfo={p}
                    onClose={onClose}
                  />
                );
              })}
            </ul>
          ) : (
            <div className={styles["empty"]}>
              <span className={styles["empty-icon"]} aria-hidden="true">
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
              <p className={styles["empty-title"]}>Your cart is empty</p>
              <p className={styles["empty-text"]}>
                Add something you like and it will show up here.
              </p>
              <button
                type="button"
                className={styles["secondary"]}
                onClick={onClose}
              >
                Continue shopping
              </button>
            </div>
          )}
        </div>

        {hasProducts && (
          <div className={styles["foot"]}>
            <div className={styles["subtotal"]}>
              <span>Subtotal</span>
              <strong>${cart?.totalPrice.toFixed(2)}</strong>
            </div>
            <div className={styles["note-row"]}>
              <p className={styles["note"]}>Delivery and payment are chosen at checkout.</p>
              <button
                type="button"
                className={styles["text-btn"]}
                onClick={() => emptyCartProducts()}
              >
                <i className="fa-solid fa-trash-can" aria-hidden="true"></i> Empty cart
              </button>
            </div>
            <div className={styles["foot-row"]}>
              <Link
                to={"/shopping-cart"}
                className={styles["secondary"]}
                onClick={() => onClose()}
              >
                View cart
              </Link>
              <Link
                to={"/checkout"}
                className={styles["primary"]}
                onClick={() => onClose()}
              >
                Checkout <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default ShoppingCartExpanded;
