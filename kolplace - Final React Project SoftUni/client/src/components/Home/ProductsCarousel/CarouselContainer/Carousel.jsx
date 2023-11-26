import { useEffect, useState } from "react";
import { getAll } from "../../../../data/services/productService";
import { Link } from "react-router-dom";
import CaroueselProductItem from "../CarouselItem/CarouselItem";
import styles from "./Carousel.module.css";

const CarouselProducts = ({ category, items, title, id }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll().then((data) => {
      let filteredProducts;
      if (id) {
        filteredProducts = data
          .filter(
            (p) =>
              p.category.name.toLowerCase() === category?.toLowerCase() &&
              p._id !== id
          )
          .sort(() => Math.floor(Math.random() - 0.5))
          .slice(-items);
        setProducts(filteredProducts);
      } else {
        filteredProducts = data
          .filter(
            (p) => p.category.name.toLowerCase() === category?.toLowerCase()
          )
          .slice(-items)
          .reverse();
        setProducts(filteredProducts);
      }
    });
  }, [category, items, id]);

  return (
    <div className={styles["carousel-products"]}>
      <div className={styles["carousel-products-heading"]}>
        <div className={styles["category-name"]}>
          <h2>{title}</h2>
          <span></span>
        </div>

        {!id && <Link to={`/categories/${category}`}>View All</Link>}
      </div>
      <div className={styles["products"]}>
        {products.length > 0 &&
          products.map((p) => {
            return <CaroueselProductItem key={p._id} {...p} />;
          })}
      </div>
    </div>
  );
};

export default CarouselProducts;
