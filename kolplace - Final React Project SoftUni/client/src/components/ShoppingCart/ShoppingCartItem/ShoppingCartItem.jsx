import { Link } from "react-router-dom";
import styles from "./ShoppingCartItem.module.css";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext";
import { useContext, useState } from "react";

const ShoppingCartItem = ({ onClick, productInfo }) => {
  const { product, quantity } = productInfo;
  const { removeCartProduct, changeProductQuantity } =
    useContext(ShoppingCartContext);
  const [value, setValue] = useState(quantity);

  const onChange = (e) => {
    const { value } = e.target;
    if (value.trim() !== "") {
      const newValue = Number(Math.min(Math.max(1, value), 50));
      setValue(newValue);
      changeProductQuantity(product._id, newValue);
    } else {
      setValue(value);
    }
    //changeProductQuantity(product._id, Number(value));
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
        value={value}
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
