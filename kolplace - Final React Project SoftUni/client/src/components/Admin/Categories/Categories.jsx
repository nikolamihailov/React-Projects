import styles from "./Categories.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { NotifContext } from "../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import CategoryItem from "./CategoryItem/CategoryItem";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../Pagination/Pagination";
import AddCategoryItem from "./AddCategoryItem/AddCategoryItem";
import EditCategoryItem from "./EditCategoryItem/EditCategoryItem";
import DeleteCategoryItem from "./DeleteCategoryItem/DeleteCategoryItem";
import { getAllWithFilters } from "../../../data/services/categoryService";
import FilterCategories from "../../Filters/AdminFilters/CategoryFilter/FilterCategories";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../../Spinner/Spinner";

const Categories = () => {
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount } =
    usePagination();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { updateAuth } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAllWithFilters(page, filter)
      .then((data) => {
        if (data.expMessage) {
          updateNotifs([{ text: data.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
        }
        updatePageCount(data.pageCount);
        setCategories(data.categories);
        setIsLoading(false);
      })
      .catch((error) => {
        updateNotifs([{ text: error, type: "error" }]);
      });
  }, [page, navigateTo, updateAuth, updateNotifs, updatePageCount, filter]);

  const updateCategories = useCallback((data) => setCategories(data), []);
  const onCloseAdd = useCallback(() => setIsAddOpen(false), []);
  const onCloseEdit = useCallback(() => setIsEditOpen(false), []);
  const onCloseDelete = useCallback(() => setIsDeleteOpen(false), []);
  const openEdit = useCallback((id) => {
    setIsEditOpen(true);
    setSelectedCategory(id);
  }, []);
  const openDelete = useCallback((id) => {
    setIsDeleteOpen(true);
    setSelectedCategory(id);
  }, []);

  const onChange = useCallback((e) => setFilter(e.target.value), []);

  return (
    <div className={styles["admin-categories"]}>
      <h1>All Categories</h1>

      <div className={styles["admin-categories-top"]}>
        <button onClick={() => setIsAddOpen(true)}>
          Add category <i className="fa-solid fa-circle-plus"></i>
        </button>
        <FilterCategories onChange={onChange} />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <motion.div layout className={styles["admin-categories-container"]}>
          <AnimatePresence>
            {categories?.length > 0 ? (
              categories.map((c) => (
                <CategoryItem
                  key={c._id}
                  {...c}
                  openEdit={openEdit}
                  openDelete={openDelete}
                />
              ))
            ) : (
              <h2>No categories</h2>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {isAddOpen && <AddCategoryItem onClose={onCloseAdd} />}
      {isEditOpen && (
        <EditCategoryItem
          onClose={onCloseEdit}
          id={selectedCategory}
          updateCategories={updateCategories}
        />
      )}
      {isDeleteOpen && (
        <DeleteCategoryItem
          onClose={onCloseDelete}
          id={selectedCategory}
          updateCategories={updateCategories}
        />
      )}
      <Pagination
        page={page}
        pageCount={pageCount}
        prevPage={prevPage}
        nextPage={nextPage}
        switchToPage={switchToPage}
      />
    </div>
  );
};

export default Categories;
