import { useContext, useEffect } from "react";
import styles from "./ShoppingCart.module.css";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import ShoppingCartItem from "./ShoppingCartItem/ShoppingCartItem";
import useTitle from "../../../hooks/useTitle";
import { Link, useNavigate } from "react-router-dom";
import { NotifContext } from "../../../contexts/NotificationContext";

const ShoppingCart = ({ onClick }) => {
  useTitle("My Shopping Cart | KolPlace");
  const { cart, emptyCartProducts } = useContext(ShoppingCartContext);
  const { updateNotifs } = useContext(NotifContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
    if (cart?.products.length === 0) {
      updateNotifs([{ text: "You have no items in the cart!", type: "error" }]);
      navigateTo("/");
    }
  }, [cart?.products, updateNotifs, navigateTo]);

  return (
    <>
      <section className={styles["cart-page-section"]}>
        <h1>My Shopping Cart</h1>
        <div className={styles["cart-icon"]}>
          <i className="fa-solid fa-shopping-cart"></i>
        </div>
        <div className={styles["cart-item-container"]}>
          {cart.products.length === 0 && (
            <div className={styles["no-products"]}>
              <img src="/src/assets/emptyCart.png" alt="empty-cart" />
              <p>Your cart is empty!</p>
              <span>
                Please add something to make me happy!
                <strong>&#58;&#41;</strong>{" "}
              </span>
            </div>
          )}
          {cart?.products.length > 0 && (
            <div className={styles["headers"]}>
              <span>Image</span>
              <span>Name</span>
              <span>Quantity</span>
              <span>Price</span>
            </div>
          )}
          {cart?.products.map((p) => {
            return (
              <ShoppingCartItem
                key={p.product._id}
                productInfo={p}
                onClick={onClick}
              />
            );
          })}
        </div>
        {cart?.products.length > 0 && (
          <>
            <p className={styles["totalPrice"]}>
              Total price: ${cart?.totalPrice.toFixed(2)}
            </p>
            <div className={styles["btns"]}>
              <button onClick={() => emptyCartProducts()}>
                Empty Cart <i className="fa-solid fa-trash-can"></i>
              </button>
              <Link to={"/checkout"}>
                <button>
                  Proceed to Checkout <i className="fas fa-arrow-right"></i>
                </button>
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ShoppingCart;
