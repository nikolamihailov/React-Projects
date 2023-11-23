import styles from "./CarouselItem.module.css";
import { Link } from "react-router-dom";

const CarouselItem = ({ name, categoryImage }) => {
  return (
    <div className={styles["carousel-home-item"]}>
      <img src={categoryImage} />
      <Link to={`/categories/${name.toLowerCase()}`}>
        <button>{name}</button>
      </Link>
    </div>
  );
};

export default CarouselItem;
