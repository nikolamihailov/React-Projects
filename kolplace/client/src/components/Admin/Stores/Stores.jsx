import { useCallback, useContext, useEffect, useState } from "react";
import AdminListPage, { AdminActionButton } from "../AdminListPage/AdminListPage";
import { AuthContext } from "../../../contexts/AuthContext";
import { NotifContext } from "../../../contexts/NotificationContext";
import { getAll } from "../../../data/services/storeService";
import { useNavigate } from "react-router-dom";
import StoreItem from "./StoreItem/StoreItem";
import AddStore from "./AddStoreItem/AddStore";
import EditStore from "./EditStore/EditStore";
import DeleteStore from "./DeleteStore/DeleteStore";

const Stores = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStore, setSelecetedStore] = useState(null);
  const { updateAuth } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);

  useEffect(() => {
    getAll()
      .then((data) => {
        if (data.expMessage) {
          updateNotifs([{ text: data.expMessage, type: "error" }]);
          navigateTo("/login");
          updateAuth({});
        }
        setStores(data);
        setIsLoading(false);
      })
      .catch((error) => {
        updateNotifs([{ text: error, type: "error" }]);
      });
  }, [navigateTo, updateAuth, updateNotifs]);

  const updateStores = useCallback((data) => setStores(data), []);
  const onCloseAdd = useCallback(() => setIsAddOpen(false), []);
  const onCloseEdit = useCallback(() => setIsEditOpen(false), []);
  const onCloseDelete = useCallback(() => setIsDeleteOpen(false), []);
  const openEdit = useCallback((id) => {
    setIsEditOpen(true);
    setSelecetedStore(id);
  }, []);
  const openDelete = useCallback((id) => {
    setIsDeleteOpen(true);
    setSelecetedStore(id);
  }, []);

  return (
    <AdminListPage
      title="Stores"
      actions={
        <AdminActionButton onClick={() => setIsAddOpen(true)}>
          <i className="fa-solid fa-circle-plus"></i> Add store
        </AdminActionButton>
      }
      isLoading={isLoading}
      isEmpty={!stores?.length}
      emptyText="No stores"
      minItemWidth={240}
      overlays={
        <>
          {isAddOpen && <AddStore onClose={onCloseAdd} updateStores={updateStores} />}
          {isEditOpen && (
            <EditStore onClose={onCloseEdit} id={selectedStore} updateStores={updateStores} />
          )}
          {isDeleteOpen && (
            <DeleteStore onClose={onCloseDelete} id={selectedStore} updateStores={updateStores} />
          )}
        </>
      }
    >
      {stores?.map((s) => (
        <StoreItem key={s._id} {...s} openEdit={openEdit} openDelete={openDelete} />
      ))}
    </AdminListPage>
  );
};

export default Stores;
