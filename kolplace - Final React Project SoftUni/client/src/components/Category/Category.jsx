import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCategoryByName } from "../../data/services/categoryService";
import { NotifContext } from "../../contexts/NotificationContext";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllWithFilters } from "../../data/services/productService";
import ProductItem from "./ProductItem/ProductItem";
import useTitle from "../../hooks/useTitle";
import styles from "./Category.module.css";
import Spinner from "../Spinner/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import FilterProductsBySort from "../Filters/UserFilters/FilterProductsBySort";
import usePagination from "../../hooks/usePagination";
import Pagination from "../Pagination/Pagination";

const Category = () => {
  const onPromotion = false;
  const { name } = useParams();
  useTitle(`${name.at(0).toUpperCase() + name.slice(1)} Category | KolPlace`);
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount } =
    usePagination();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [sortFilter, setSortFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("createdAt-asc");
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  const onSortFilterChange = useCallback(
    (e) => setSortFilter(e.target.value),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getOneCategoryByName(name);

        if (categoryData.expMessage) {
          updateNotifs([{ text: categoryData.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
          return;
        }

        if (categoryData.nonExisting) {
          updateNotifs([{ text: categoryData.nonExisting, type: "error" }]);
          navigateTo("/error");
          return;
        }

        setCategory(categoryData);

        const productsData = await getAllWithFilters(
          page,
          sortFilter,
          categoryData._id,
          onPromotion
        );

        if (productsData.expMessage) {
          updateNotifs([{ text: productsData.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
          return;
        }
        setProducts(productsData.products);
        setProductsCount(productsData.productsCount);
        setIsLoading(false);
        updatePageCount(productsData.pageCount);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [
    name,
    page,
    sortFilter,
    updateAuth,
    updateNotifs,
    navigateTo,
    updatePageCount,
    onPromotion,
  ]);

  useEffect(() => {
    // clear filter on category change
    setSortFilter("");
    setSelectedFilter("createdAt-asc");
    window.scrollTo(0, 0);
  }, [name, sortFilter]);

  return (
    <section className={styles["category-section"]}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <h1>{category?.name} Category</h1>
            <img
              className={styles["category-banner-image"]}
              src={category?.categoryImage}
              alt={category?.name}
            />
          </div>

          <hr />

          <div className={styles["sort-and-info"]}>
            <p>
              Products in this category: <span>{productsCount}</span>
            </p>
            {products.length >= 2 && (
              <FilterProductsBySort
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                  onSortFilterChange(e);
                }}
                /*onChange={onSortFilterChange}
              value={selectedFilter}*/
              />
            )}
          </div>

          <motion.div layout className={styles["products"]}>
            <AnimatePresence>
              {products.length > 0 ? (
                products.map((p) => {
                  return <ProductItem key={p._id} {...p} />;
                })
              ) : (
                <h2>No products in this category!</h2>
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

export default Category;
