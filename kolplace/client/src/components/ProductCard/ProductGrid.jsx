import styles from "./ProductGrid.module.css";

// Responsive grid for product cards: as many columns as fit, all cards in a
// row the same height.
const ProductGrid = ({ children, className = "" }) => (
  <div className={`${styles["grid"]} ${className}`}>{children}</div>
);

export default ProductGrid;
