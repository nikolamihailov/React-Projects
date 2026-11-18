import { useContext, useEffect } from "react";
import styles from "./ShoppingCart.module.css";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import ShoppingCartItem from "./ShoppingCartItem/ShoppingCartItem";
import useTitle from "../../../hooks/useTitle";
import { Link, useNavigate } from "react-router-dom";
import { NotifContext } from "../../../contexts/NotificationContext";
import Spinner from "../../Spinner/Spinner";

const ShoppingCart = ({ onClick }) => {
  useTitle("My Shopping Cart | KolPlace");
  const { cart, emptyCartProducts } = useContext(ShoppingCartContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
    if (cart?.isLoaded && cart.products.length === 0) {
      updateNotifs([{ text: "You have no items in the cart!", type: "error" }]);
      navigateTo("/");
    }
  }, [cart?.isLoaded, cart?.products, updateNotifs, navigateTo]);

  const itemCount =
    cart?.products.reduce((count, p) => count + Number(p.quantity), 0) ?? 0;
  const itemLabel = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;

  return (
    <section className={styles["cart-page"]}>
      <div className={styles["page-head"]}>
        <h1>Shopping cart</h1>
        {cart?.products.length > 0 && (
          <p>
            {itemLabel} in your cart. Review them, then continue to checkout.
          </p>
        )}
      </div>

      {!cart.isLoaded ? (
        <Spinner />
      ) : cart.products.length === 0 ? (
        <div className={styles["empty"]}>
          <span className={styles["empty-icon"]} aria-hidden="true">
            <i className="fa-solid fa-cart-shopping"></i>
          </span>
          <h2>Your cart is empty</h2>
          <p>Add something you like and it will show up here.</p>
          <Link to="/" className={styles["primary"]}>
            Start shopping
          </Link>
        </div>
      ) : (
        <div className={styles["layout"]}>
          <div className={styles["items-card"]}>
            <div className={styles["items-head"]}>
              <h2>Items</h2>
              <button
                type="button"
                className={styles["text-btn"]}
                onClick={() => emptyCartProducts()}
              >
                <i className="fa-solid fa-trash-can"></i> Empty cart
              </button>
            </div>
            <ul className={styles["items"]}>
              {cart?.products.map((p) => {
                return (
                  <ShoppingCartItem
                    key={p.product._id}
                    productInfo={p}
                    onClick={onClick}
                  />
                );
              })}
            </ul>
          </div>

          <aside className={styles["summary"]} aria-label="Order summary">
            <h2>Order summary</h2>
            <dl className={styles["rows"]}>
              <div>
                <dt>Subtotal ({itemLabel})</dt>
                <dd>${cart?.totalPrice.toFixed(2)}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd className={styles["muted"]}>Chosen at checkout</dd>
              </div>
              <div className={styles["total"]}>
                <dt>Total</dt>
                <dd>${cart?.totalPrice.toFixed(2)}</dd>
              </div>
            </dl>
            <Link to={"/checkout"} className={styles["primary"]}>
              Proceed to checkout <i className="fas fa-arrow-right"></i>
            </Link>
            <Link to={"/"} className={styles["secondary"]}>
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
};

export default ShoppingCart;
