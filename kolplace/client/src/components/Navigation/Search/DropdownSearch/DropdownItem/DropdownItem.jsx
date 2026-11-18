import { Link } from "react-router-dom";
import styles from "./DropdownItem.module.css";

const DropdownItem = ({
  _id,
  name,
  mainImage,
  price,
  hasPromoPrice,
  promoPrice,
  search,
  onClose,
}) => {
  const highlight = (name, searchedTerm) => {
    if (name.toLowerCase().includes(searchedTerm.toLowerCase())) {
      const index = name.toLowerCase().indexOf(searchedTerm.toLowerCase());
      if (index === 0)
        return (
          <>
            <span className={styles.highlight}>
              {name.slice(index, index + searchedTerm.length)}
            </span>
            {name.slice(index + searchedTerm.length)}
          </>
        );
      return (
        <>
          {name.slice(0, index)}
          <span className={styles.highlight}>
            {name.slice(index, index + searchedTerm.length)}
          </span>
          {name.slice(index + searchedTerm.length)}
        </>
      );
    }
    return name;
  };
  return (
    <div className={styles["dropdown-search-item"]}>
      <Link to={`/products/${_id}`} onClick={onClose}>
        {" "}
        <img src={mainImage} alt="product-image" />
      </Link>
      <Link to={`/products/${_id}`} onClick={onClose}>
        {" "}
        <h3>{highlight(name, search)}</h3>
      </Link>
      <div className={styles["prices"]}>
        <p
          style={
            hasPromoPrice
              ? { textDecoration: "line-through", fontSize: "15px" }
              : { textDecoration: "none" }
          }
        >
          ${price.toFixed(2)}
        </p>
        {hasPromoPrice && (
          <p className={styles["promo-price"]}>${promoPrice.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
};

export default DropdownItem;
