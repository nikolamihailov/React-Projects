import ShoppingCartDropdown from "../../../ShoppingCart/ShoppingCartDropdown/ShoppingCartDropdown";
import styles from "../Icons.module.css";
import useDropdown from "../../../../hooks/useDropdown";

const ShoppingCartIcon = () => {
  const { isOpen, mouseEnter, mouseLeave } = useDropdown();

  return (
    <>
      <div
        className={styles["dropdown-container"]}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <button
          className={styles["icon-btn"]}
          title="Shopping Cart"
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span>0</span>
        </button>
        {isOpen && <ShoppingCartDropdown />}
      </div>
    </>
  );
};
export default ShoppingCartIcon;
