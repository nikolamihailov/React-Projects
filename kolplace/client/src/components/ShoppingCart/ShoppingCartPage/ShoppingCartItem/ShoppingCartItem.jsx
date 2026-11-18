import { Link } from "react-router-dom";
import styles from "./ShoppingCartItem.module.css";
import { ShoppingCartContext } from "../../../../contexts/ShoppingCartContext";
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
      <Link
        to={`/products/${product._id}`}
        onClick={onClick}
        className={styles["image"]}
      >
        <img src={product.mainImage} alt={product.name} />
      </Link>
      <div className={styles["title-category"]}>
        <Link to={`/products/${product._id}`} onClick={onClick}>
          <h4>{product.name}</h4>
        </Link>
        <Link
          to={`/categories/${product.category.name.toLowerCase()}`}
          onClick={onClick}
          className={styles["title-category"]}
        >
          <span>{product.category.name}</span>
        </Link>
      </div>

      <div className={styles["quantity"]}>
        X
        <input
          type="number"
          name="quantity"
          min={1}
          max={25}
          value={value}
          onChange={onChange}
        />
      </div>

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
