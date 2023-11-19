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

const Categories = () => {
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount } =
    usePagination();
  const [categories, setCategories] = useState();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { updateAuth } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    getAllWithFilters(page)
      .then((data) => {
        if (data.expMessage) {
          updateNotifs([{ text: data.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
        }
        updatePageCount(data.pageCount);
        setCategories(data.categories);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [page, navigateTo, updateAuth, updateNotifs, updatePageCount]);

  const updateCategories = (data) => setCategories(data);
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

  return (
    <div className={styles["admin-categories"]}>
      <h1>All Categories</h1>
      <button onClick={() => setIsAddOpen(true)}>
        Add category <i className="fa-solid fa-circle-plus"></i>
      </button>
      <div className={styles["admin-categories-container"]}>
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
      </div>
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
