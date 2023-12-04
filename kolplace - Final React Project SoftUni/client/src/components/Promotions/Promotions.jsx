import { useCallback, useEffect, useState } from "react";
import { getAllWithFilters } from "../../data/services/productService";
import useTitle from "../../hooks/useTitle";
import Spinner from "../Spinner/Spinner";
import styles from "./Promotions.module.css";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import FilterProductsByCategory from "../Filters/UserFilters/FilterProductsByCategory";
import ProductItem from "../Category/ProductItem/ProductItem";
import { motion, AnimatePresence } from "framer-motion";
import FilterProductsBySort from "../Filters/UserFilters/FilterProductsBySort";

const Promotions = () => {
  const onPromotion = true;
  useTitle("Products On Promotion | KolPlace");
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount } =
    usePagination();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");

  useEffect(() => {
    getAllWithFilters(page, sortFilter, categoryFilter, onPromotion)
      .then((data) => {
        setProducts(data.products);
        updatePageCount(data.pageCount);
        setProductsCount(data.productsCount);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [updatePageCount, page, sortFilter, categoryFilter, onPromotion]);

  const onCategoryFilterChange = useCallback((e) => {
    setCategoryFilter(e.target.value);
  }, []);

  const onSortFilterChange = useCallback(
    (e) => setSortFilter(e.target.value),
    []
  );

  return (
    <section className={styles["promotions-section"]}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <h1>Products On Promotion</h1>
            <img
              className={styles["promotion-banner-image"]}
              src="/src/assets/promotions-banner.png"
              alt="promotions-banner"
            />
          </div>
          <hr />
          <div className={styles["sort-and-info"]}>
            <FilterProductsByCategory onChange={onCategoryFilterChange} />
            <p>
              Products on promotion: <span>{productsCount}</span>
            </p>
            {productsCount >= 2 && (
              <FilterProductsBySort onChange={onSortFilterChange} />
            )}
          </div>
          <motion.div layout className={styles["products"]}>
            <AnimatePresence>
              {products.length > 0 ? (
                products.map((p) => {
                  return <ProductItem key={p._id} {...p} />;
                })
              ) : (
                <h2>No products are on promotion from this category!</h2>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
      <div className={styles["pagination"]}>
        {pageCount > 1 && (
          <Pagination
            page={page}
            pageCount={pageCount}
            prevPage={prevPage}
            nextPage={nextPage}
            switchToPage={switchToPage}
          />
        )}
      </div>
    </section>
  );
};

export default Promotions;
