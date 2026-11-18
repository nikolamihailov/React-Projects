import AdminListPage, { AdminActionButton } from "../AdminListPage/AdminListPage";
import { useCallback, useContext, useEffect, useState } from "react";
import { NotifContext } from "../../../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import CategoryItem from "./CategoryItem/CategoryItem";
import usePagination from "../../../hooks/usePagination";
import AddCategoryItem from "./AddCategoryItem/AddCategoryItem";
import EditCategoryItem from "./EditCategoryItem/EditCategoryItem";
import DeleteCategoryItem from "./DeleteCategoryItem/DeleteCategoryItem";
import { getAllWithFilters } from "../../../data/services/categoryService";
import FilterCategories from "../../Filters/AdminFilters/CategoryFilter/FilterCategories";

const Categories = () => {
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount, resetPage } =
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
  const [pageSize, setPageSize] = useState(null);
  const onPageSizeChange = useCallback((size) => {
    setPageSize(size);
    resetPage();
  }, [resetPage]);

  useEffect(() => {
    if (!pageSize) return;
    getAllWithFilters(page, filter, pageSize)
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
  }, [page, navigateTo, updateAuth, updateNotifs, updatePageCount, filter, pageSize]);

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

  const onChange = useCallback((e) => {
    setFilter(e.target.value);
    resetPage();
  }, [resetPage]);

  return (
    <AdminListPage
      title="Categories"
      actions={
        <AdminActionButton onClick={() => setIsAddOpen(true)}>
          <i className="fa-solid fa-circle-plus"></i> Add category
        </AdminActionButton>
      }
      filters={<FilterCategories onChange={onChange} />}
      isLoading={isLoading}
      isEmpty={!categories?.length}
      emptyText="No categories"
      minItemWidth={220}
      onPageSizeChange={onPageSizeChange}
      pagination={{ page, pageCount, prevPage, nextPage, switchToPage }}
      overlays={
        <>
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
        </>
      }
    >
      {categories?.map((c) => (
        <CategoryItem key={c._id} {...c} openEdit={openEdit} openDelete={openDelete} />
      ))}
    </AdminListPage>
  );
};

export default Categories;
