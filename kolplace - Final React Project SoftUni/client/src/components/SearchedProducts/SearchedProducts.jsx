import { useSearchParams } from "react-router-dom";
import styles from "./SearchedProducts.module.css";
import { useEffect, useState } from "react";
import { searchProducts } from "../../data/services/productService";
import { motion, AnimatePresence } from "framer-motion";
import ProductItem from "../Category/ProductItem/ProductItem";
import useTitle from "../../hooks/useTitle";
import Spinner from "../Spinner/Spinner";

const SearchedProducts = () => {
  useTitle(`Search Results | KolPlace`);
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const search = searchParams.get("for");
    if (search.trim() === "") setIsLoading(false);
    if (search) {
      searchProducts(search)
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [searchParams]);
  return (
    <section className={styles["searched-products-section"]}>
      <h1>Search For: {searchParams.get("for")}</h1>
      <div className={styles["search-icon"]}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </section>
  );
};

export default SearchedProducts;
