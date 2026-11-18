import styles from "./CarouselItem.module.css";
import { Link } from "react-router-dom";

const CarouselItem = ({ name, categoryImage, isActive }) => (
  // Off-screen slides are hidden from screen readers and keyboard focus.
  <div className={styles["carousel-home-item"]} aria-hidden={!isActive}>
    <img src={categoryImage} alt={name} />
    <Link
      to={`/categories/${name.toLowerCase()}`}
      className={styles["cta"]}
      tabIndex={isActive ? 0 : -1}
    >
      {name}
    </Link>
  </div>
);

export default CarouselItem;
