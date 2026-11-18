import { useCallback, useContext, useEffect, useState } from "react";
import AdminListPage, { AdminActionButton } from "../AdminListPage/AdminListPage";
import ProductForm from "./ProductForm/ProductForm";
import usePagination from "../../../hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { NotifContext } from "../../../contexts/NotificationContext";
import { getAllWithFilters } from "../../../data/services/productService";
import ProductItem from "./ProductItem/ProductItem";
import DeleteProductItem from "./DeleteProductItem/DeleteProductItem";
import FilterProductsByCategory from "../../Filters/AdminFilters/ProductFilters/FilterProductsByCategory";
import FilterProductsBySort from "../../Filters/AdminFilters/ProductFilters/FilterProductsBySort";

const Products = () => {
  const onPromotion = false;
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount, resetPage } =
    usePagination();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [pageSize, setPageSize] = useState(null);
  const onPageSizeChange = useCallback((size) => {
    setPageSize(size);
    resetPage();
  }, [resetPage]);

  const { updateAuth } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    if (!pageSize) return;
    getAllWithFilters(
      page,
      sortFilter,
      categoryFilter,
      onPromotion,
      pageSize
    )
      .then((data) => {
        if (data.expMessage) {
          updateNotifs([{ text: data.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
        }
        updatePageCount(data.pageCount);
        setProducts(data.products);
        setIsLoading(false);
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
    pageSize,
    reloadKey,
  ]);

  const updateProducts = useCallback((data) => setProducts(data), []);
  // A new item can land on any page, so reload; an edit is swapped in place.
  const onSaved = useCallback((saved, isNew) => {
    if (isNew) setReloadKey((k) => k + 1);
    else setProducts((list) => list.map((p) => (p._id === saved._id ? saved : p)));
  }, []);
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
    resetPage();
  }, [resetPage]);

  const onSortFilterChange = useCallback((e) => {
    setSortFilter(e.target.value);
    resetPage();
  }, [resetPage]);

  return (
    <AdminListPage
      title="Products"
      actions={
        <AdminActionButton onClick={() => setIsAddOpen(true)}>
          <i className="fa-solid fa-circle-plus"></i> Add product
        </AdminActionButton>
      }
      filters={
        <>
          <FilterProductsByCategory onChange={onCategoryFilterChange} />
          <FilterProductsBySort onChange={onSortFilterChange} />
        </>
      }
      isLoading={isLoading}
      isEmpty={!products?.length}
      emptyText="No products"
      minItemWidth={200}
      onPageSizeChange={onPageSizeChange}
      pagination={{ page, pageCount, prevPage, nextPage, switchToPage }}
      overlays={
        <>
          {isAddOpen && <ProductForm onClose={onCloseAdd} onSaved={onSaved} />}
          {isEditOpen && (
            <ProductForm onClose={onCloseEdit} id={selectedProduct} onSaved={onSaved} />
          )}
          {isDeleteOpen && (
            <DeleteProductItem
              onClose={onCloseDelete}
              id={selectedProduct}
              updateProducts={updateProducts}
            />
          )}
        </>
      }
    >
      {products?.map((p) => (
        <ProductItem key={p._id} {...p} openEdit={openEdit} openDelete={openDelete} />
      ))}
    </AdminListPage>
  );
};

export default Products;
