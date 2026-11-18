import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCategoryByName } from "../../data/services/categoryService";
import { NotifContext } from "../../contexts/NotificationContext";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllWithFilters } from "../../data/services/productService";
import ProductCard from "../ProductCard/ProductCard";
import ProductGrid from "../ProductCard/ProductGrid";
import useTitle from "../../hooks/useTitle";
import styles from "./Category.module.css";
import Spinner from "../Spinner/Spinner";
import FilterProductsBySort from "../Filters/UserFilters/FilterProductsBySort";
import ListToolbar from "../Filters/ListToolbar/ListToolbar";
import usePagination from "../../hooks/usePagination";
import Pagination from "../Pagination/Pagination";

const Category = () => {
  const onPromotion = false;
  /*   const [searchParams, setSearchParams] = useSearchParams(); */
  const { name } = useParams();
  useTitle(`${name.at(0).toUpperCase() + name.slice(1)} Category | KolPlace`);
  const {
    page,
    pageCount,
    prevPage,
    nextPage,
    switchToPage,
    updatePageCount,
    resetPage,
  } = usePagination();
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

        /*setSearchParams({
          page,
          sortFilter,
          category: categoryData._id,
          onPromotion,
        }); */
        // console.log(searchParams.get("page"));
        // set searchParams
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
    resetPage();
    setSortFilter("");
    setSelectedFilter("createdAt-asc");
    window.scrollTo(0, 0);
  }, [name, resetPage]);

  return (
    <section className={styles["category-section"]}>
      {isLoading ? (
        <div className={styles["loading"]}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className={styles["hero"]}>
            <div className={styles["hero-text"]}>
              <p className={styles["eyebrow"]}>Category</p>
              <h1 className={styles["title"]}>{category?.name}</h1>
              <p className={styles["subtitle"]}>
                Everything we stock in {category?.name}, all in one place.
              </p>
            </div>
            {category?.categoryImage && (
              <div className={styles["hero-media"]}>
                <img src={category.categoryImage} alt={category.name} />
              </div>
            )}
          </div>

          <ListToolbar
            count={productsCount}
            label={productsCount === 1 ? "product" : "products"}
            filters={
              products.length >= 2 && (
                <FilterProductsBySort
                  value={selectedFilter}
                  onChange={(e) => {
                    setSelectedFilter(e.target.value);
                    onSortFilterChange(e);
                  }}
                />
              )
            }
          />

          <ProductGrid>
              {products.length > 0 ? (
                products.map((p) => {
                  return <ProductCard key={p._id} {...p} />;
                })
              ) : (
                <h2>No products in this category!</h2>
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

export default Category;
