import { useCallback, useContext, useEffect, useState } from "react";
import AdminListPage, { AdminActionButton } from "../AdminListPage/AdminListPage";
import AddProductItem from "./AddProductItem/AddProduct";
import usePagination from "../../../hooks/usePagination";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { NotifContext } from "../../../contexts/NotificationContext";
import { getAllWithFilters } from "../../../data/services/productService";
import ProductItem from "./ProductItem/ProductItem";
import EditProductItem from "./EditProductItem/EditProduct";
import DeleteProductItem from "./DeleteProductItem/DeleteProductItem";
import FilterProductsByCategory from "../../Filters/AdminFilters/ProductFilters/FilterProductsByCategory";
import FilterProductsBySort from "../../Filters/AdminFilters/ProductFilters/FilterProductsBySort";

const Products = () => {
  const onPromotion = false;
  const itemsPerPage = 8;
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

  const { updateAuth } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    getAllWithFilters(
      page,
      sortFilter,
      categoryFilter,
      onPromotion,
      itemsPerPage
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
    itemsPerPage,
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
      pagination={{ page, pageCount, prevPage, nextPage, switchToPage }}
      overlays={
        <>
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
