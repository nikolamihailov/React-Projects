import { useSearchParams } from "react-router-dom";
import styles from "./SearchedProducts.module.css";
import { useEffect, useState } from "react";
import { searchProducts } from "../../data/services/productService";
import { motion, AnimatePresence } from "framer-motion";
import ProductItem from "../Category/ProductItem/ProductItem";

const SearchedProducts = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const search = searchParams.get("for");
    searchProducts(search)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, [searchParams]);
  return (
    <section className={styles["searched-products-section"]}>
      <h1>Searched Products</h1>
      <div className={styles["search-icon"]}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <motion.div layout className={styles["products"]}>
        <AnimatePresence>
          {products.length > 0 ? (
            products.map((p) => {
              return <ProductItem key={p._id} {...p} />;
            })
          ) : (
            <h2 className={styles["no-products"]}>
              No products matched the search!
            </h2>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default SearchedProducts;
