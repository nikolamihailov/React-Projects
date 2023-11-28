import { Link } from "react-router-dom";
import styles from "./ShoppingCartItem.module.css";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import { useContext } from "react";

const ShoppingCartItem = ({ onClick, productInfo }) => {
  const { product, quantity } = productInfo;
  const { removeCartProduct, changeProductQuantity } =
    useContext(ShoppingCartContext);
  const onChange = (e) => {
    changeProductQuantity(product._id, Number(e.target.value));
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
