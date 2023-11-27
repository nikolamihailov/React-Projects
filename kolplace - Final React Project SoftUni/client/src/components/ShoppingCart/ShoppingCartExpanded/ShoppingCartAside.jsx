import { useContext } from "react";
import styles from "./Aside.module.css";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";

const ShoppingCartExpanded = ({ onClick }) => {
  const { cart, emptyCartProducts, removeCartProduct } =
    useContext(ShoppingCartContext);
  return (
    <>
      <div className="backdrop" onClick={onClick}></div>
      <aside className={styles["cart-aside"]}>
        <div onClick={onClick}>
          <i className="fa-solid fa-x"></i>
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
          {cart?.products.map((p) => {
            return (
              <ShoppingCartItem
                key={p.product._id}
                {...p.product}
                removeCartProduct={removeCartProduct}
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
              <button>
                View Cart
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
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
