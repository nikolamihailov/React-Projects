import { Link } from "react-router-dom";
import styles from "./DropdownItem.module.css";

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

// Wraps the first match of the searched term in a <mark>.
const highlight = (name, term) => {
  const index = term ? name.toLowerCase().indexOf(term.toLowerCase()) : -1;
  if (index === -1) return name;
  return (
    <>
      {name.slice(0, index)}
      <mark className={styles["highlight"]}>
        {name.slice(index, index + term.length)}
      </mark>
      {name.slice(index + term.length)}
    </>
  );
};

const DropdownItem = ({
  _id,
  id,
  name,
  mainImage,
  price,
  hasPromoPrice,
  promoPrice,
  search,
  isActive,
  onHover,
  onClose,
}) => {
  return (
    <li id={id} role="option" aria-selected={isActive}>
      <Link
        to={`/products/${_id}`}
        onClick={onClose}
        onMouseEnter={onHover}
        className={`${styles["item"]} ${isActive ? styles["active"] : ""}`}
      >
        <span className={styles["thumb"]}>
          <img src={mainImage} alt="" loading="lazy" />
        </span>
        <span className={styles["name"]}>{highlight(name, search)}</span>
        <span className={styles["prices"]}>
          {hasPromoPrice ? (
            <>
              <span className={`${styles["current"]} ${styles["sale"]}`}>
                {formatPrice(promoPrice)}
              </span>
              <s className={styles["old"]} aria-label={`was ${formatPrice(price)}`}>
                {formatPrice(price)}
              </s>
            </>
          ) : (
            <span className={styles["current"]}>{formatPrice(price)}</span>
          )}
        </span>
      </Link>
    </li>
  );
};

export default DropdownItem;
