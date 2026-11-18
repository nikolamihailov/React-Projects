import { Link } from "react-router-dom";
import styles from "./ShoppingCartItem.module.css";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../../../contexts/ShoppingCartContext";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 50;

const ShoppingCartItem = ({ onClose, productInfo }) => {
  const { product, quantity } = productInfo;
  const { removeCartProduct, changeProductQuantity } =
    useContext(ShoppingCartContext);
  const [value, setValue] = useState(quantity);

  const updateQuantity = (next) => {
    const newValue = Number(
      Math.min(Math.max(MIN_QUANTITY, next), MAX_QUANTITY)
    );
    setValue(newValue);
    changeProductQuantity(product._id, newValue);
  };

  const onChange = (e) => {
    const { value } = e.target;
    if (value.trim() !== "") {
      updateQuantity(value);
    } else {
      setValue(value);
    }
  };

  const unitPrice = product.hasPromoPrice ? product.promoPrice : product.price;
  const productUrl = `/products/${product._id}`;

  return (
    <li className={styles["cart-item"]}>
      <Link
        to={productUrl}
        onClick={onClose}
        className={styles["thumb"]}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={product.mainImage} alt="" />
      </Link>

      <div className={styles["info"]}>
        <Link to={productUrl} onClick={onClose} className={styles["name"]}>
          {product.name}
        </Link>
        <p className={styles["unit-price"]}>
          {product.hasPromoPrice ? (
            <>
              <span className={styles["sale"]}>
                ${product.promoPrice.toFixed(2)}
              </span>
              <s>${product.price.toFixed(2)}</s>
            </>
          ) : (
            <span>${product.price.toFixed(2)}</span>
          )}
        </p>
        <div className={styles["stepper"]}>
          <button
            type="button"
            aria-label={`Decrease quantity of ${product.name}`}
            onClick={() => updateQuantity(Number(value) - 1)}
            disabled={Number(value) <= MIN_QUANTITY}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <input
            type="number"
            name="quantity"
            aria-label={`Quantity of ${product.name}`}
            min={MIN_QUANTITY}
            max={MAX_QUANTITY}
            value={value}
            onChange={onChange}
          />
          <button
            type="button"
            aria-label={`Increase quantity of ${product.name}`}
            onClick={() => updateQuantity(Number(value) + 1)}
            disabled={Number(value) >= MAX_QUANTITY}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className={styles["side"]}>
        <button
          type="button"
          className={styles["remove"]}
          aria-label={`Remove ${product.name} from cart`}
          title="Remove"
          onClick={() => removeCartProduct(product._id)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <p className={styles["line-total"]}>
          ${(unitPrice * quantity).toFixed(2)}
        </p>
      </div>
    </li>
  );
};

export default ShoppingCartItem;
