import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./Products.module.css";
import AddProductItem from "./AddProductItem/AddProduct";
import usePagination from "../../../hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { NotifContext } from "../../../contexts/NotificationContext";
import { getAllWithFilters } from "../../../data/services/productService";
import Pagination from "../../Pagination/Pagination";
import ProductItem from "./ProductItem/ProductItem";
import EditProductItem from "./EditProductItem/EditProduct";
import DeleteProductItem from "./DeleteProductItem/DeleteProductItem";
import FilterProductsByCategory from "../../Filters/AdminFilters/ProductFilters/FilterProductsByCategory";
import FilterProductsBySort from "../../Filters/AdminFilters/ProductFilters/FilterProductsBySort";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const onPromotion = false;
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount } =
    usePagination();
  const [products, setProducts] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");

  const { updateAuth } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    getAllWithFilters(page, sortFilter, categoryFilter, onPromotion)
      .then((data) => {
        if (data.expMessage) {
          updateNotifs([{ text: data.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
        }
        updatePageCount(data.pageCount);
        setProducts(data.products);
      })
      .catch((error) => {
        updateNotifs([{ text: error, type: "error" }]);
      });
  }, [
    page,
    navigateTo,
    updateAuth,
    updateNotifs,
    updatePageCount,
    sortFilter,
    categoryFilter,
    onPromotion,
  ]);

  const updateProducts = useCallback((data) => setProducts(data), []);
  const onCloseAdd = useCallback(() => setIsAddOpen(false), []);
  const onCloseEdit = useCallback(() => setIsEditOpen(false), []);
  const onCloseDelete = useCallback(() => setIsDeleteOpen(false), []);
  const openEdit = useCallback((id) => {
    setIsEditOpen(true);
    setSelectedProduct(id);
  }, []);
  const openDelete = useCallback((id) => {
    setIsDeleteOpen(true);
    setSelectedProduct(id);
  }, []);

  const onCategoryFilterChange = useCallback((e) => {
    setCategoryFilter(e.target.value);
  }, []);

  const onSortFilterChange = useCallback(
    (e) => setSortFilter(e.target.value),
    []
  );

  return (
    <div className={styles["admin-products"]}>
      <h1>All Products</h1>

      <div className={styles["admin-products-top"]}>
        <FilterProductsByCategory onChange={onCategoryFilterChange} />
        <button onClick={() => setIsAddOpen(true)}>
          Add product <i className="fa-solid fa-circle-plus"></i>
        </button>
        <FilterProductsBySort onChange={onSortFilterChange} />
      </div>

      <motion.div layout className={styles["admin-products-container"]}>
        <AnimatePresence>
          {products?.length > 0 ? (
            products.map((p) => (
              <ProductItem
                key={p._id}
                {...p}
                openEdit={openEdit}
                openDelete={openDelete}
              />
            ))
          ) : (
            <h2>No products</h2>
          )}
        </AnimatePresence>
      </motion.div>
      {isAddOpen && <AddProductItem onClose={onCloseAdd} />}
      {isEditOpen && (
        <EditProductItem
          onClose={onCloseEdit}
          id={selectedProduct}
          updateProducts={updateProducts}
        />
      )}
      {isDeleteOpen && (
        <DeleteProductItem
          onClose={onCloseDelete}
          id={selectedProduct}
          updateProducts={updateProducts}
        />
      )}
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
  );
};

export default Products;
