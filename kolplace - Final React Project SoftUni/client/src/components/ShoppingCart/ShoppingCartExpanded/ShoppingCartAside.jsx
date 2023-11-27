import { useContext } from "react";
import styles from "./Aside.module.css";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";

const ShoppingCartExpanded = ({ onClick }) => {
  const { cart } = useContext(ShoppingCartContext);
  return (
    <>
      <div className="backdrop" onClick={onClick}></div>
      <aside className={styles["cart-aside"]}>
        <div onClick={onClick}>
          <i className="fa-solid fa-x"></i>
        </div>
        <div className={styles["cart-item-container"]}>
          {console.log(cart.totalPrice)}
          {cart?.products.map((p) => {
            return <ShoppingCartItem key={p._id} {...p.product} />;
          })}
        </div>
        <button>
          <i className="fa-solid fa-cart-shopping"></i>
          View Cart
        </button>
      </aside>
    </>
  );
};

export default ShoppingCartExpanded;
