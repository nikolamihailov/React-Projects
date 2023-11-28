import { Link } from "react-router-dom";
import styles from "./ShoppingCartItem.module.css";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import { useContext } from "react";

const ShoppingCartItem = ({ onClick, productInfo }) => {
  const { product, quantity } = productInfo;
  const { removeCartProduct, changeProductQuantity } =
    useContext(ShoppingCartContext);

  const onChange = (e) => {
    const { value } = e.target;
    /* 
    if (value) {
      const newValue = Number(Math.min(Math.max(1, value), 25));
      e.target.value = newValue;
      changeProductQuantity(product._id, newValue);
    } */
    changeProductQuantity(product._id, Number(value));
  };
  return (
    <div className={styles["cart-item"]}>
      <img src={product.mainImage} alt={product.name} />
      <Link to={`/products/${product._id}`} onClick={onClick}>
        <h4>{product.name}</h4>
      </Link>
      X
      <input
        type="number"
        name="quantity"
        min={1}
        max={25}
        value={quantity || 1}
        onChange={onChange}
      />
      <p>
        $
        {product.hasPromoPrice
          ? product.promoPrice.toFixed(2)
          : product.price.toFixed(2)}
      </p>
      <div
        className={styles["remove"]}
        onClick={() => removeCartProduct(product._id)}
      >
        <i className="fa-solid fa-trash-can"></i>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
