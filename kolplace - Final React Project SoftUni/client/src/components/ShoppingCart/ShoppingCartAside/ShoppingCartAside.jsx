import { useContext } from "react";
import styles from "./Aside.module.css";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import ShoppingCartItem from "./ShoppingCartItem/ShoppingCartItem";
import { Link } from "react-router-dom";
import emptyCart from "../../../assets/emptyCart.png";

const ShoppingCartExpanded = ({ onClose }) => {
  const { cart, emptyCartProducts } = useContext(ShoppingCartContext);
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <aside className={styles["cart-aside"]}>
        <div onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </div>
        <div className={styles["cart-item-container"]}>
          {cart.products.length === 0 && (
            <div className={styles["no-products"]}>
              <img src={emptyCart} alt="empty-cart" />
              <p>Your cart is empty!</p>
              <span>
                Please add something to make me happy!
                <strong>&#58;&#41;</strong>{" "}
              </span>
            </div>
          )}
          {cart?.products.map((p) => {
            return (
              <ShoppingCartItem
                key={p.product._id}
                productInfo={p}
                onClose={onClose}
              />
            );
          })}
        </div>
        {cart.products.length > 0 && (
          <>
            <p className={styles["totalPrice"]}>
              Total price: ${cart?.totalPrice.toFixed(2)}
            </p>
            <div className={styles["btns"]}>
              <Link to={"/shopping-cart"} onClick={() => onClose()}>
                <button>
                  View Cart
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </Link>
              <button onClick={() => emptyCartProducts()}>
                Empty Cart <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default ShoppingCartExpanded;
