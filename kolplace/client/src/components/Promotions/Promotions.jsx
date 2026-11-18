import { useCallback, useEffect, useState } from "react";
import { getAllWithFilters } from "../../data/services/productService";
import useTitle from "../../hooks/useTitle";
import Spinner from "../Spinner/Spinner";
import styles from "./Promotions.module.css";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import FilterProductsByCategory from "../Filters/UserFilters/FilterProductsByCategory";
import ProductCard from "../ProductCard/ProductCard";
import ProductGrid from "../ProductCard/ProductGrid";
import FilterProductsBySort from "../Filters/UserFilters/FilterProductsBySort";
import ListToolbar from "../Filters/ListToolbar/ListToolbar";
import promotionsBanner from "../../assets/promotions-banner.png";

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
        <div className={styles["loading"]}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className={styles["hero"]}>
            <div className={styles["hero-text"]}>
              <p className={styles["eyebrow"]}>Deals</p>
              <h1 className={styles["title"]}>Products on promotion</h1>
              <p className={styles["subtitle"]}>
                Reduced prices across every category, while stocks last.
              </p>
            </div>
            <div className={styles["hero-media"]}>
              <img src={promotionsBanner} alt="Special promotion" />
            </div>
          </div>
          <ListToolbar
            count={productsCount}
            label={productsCount === 1 ? "product on promotion" : "products on promotion"}
            filters={
              <>
                <FilterProductsByCategory onChange={onCategoryFilterChange} />
                {productsCount >= 2 && <FilterProductsBySort onChange={onSortFilterChange} />}
              </>
            }
          />
          <ProductGrid>
              {products.length > 0 ? (
                products.map((p) => {
                  return <ProductCard key={p._id} {...p} />;
                })
              ) : (
                <h2>No products are on promotion from this category!</h2>
              )}
          </ProductGrid>
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
