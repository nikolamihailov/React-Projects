import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./Stores.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../contexts/AuthContext";
import { NotifContext } from "../../../contexts/NotificationContext";
import Spinner from "../../Spinner/Spinner";
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
    <div className={styles["admin-stores"]}>
      <h1>All Stores</h1>

      <div className={styles["admin-stores-top"]}>
        <button onClick={() => setIsAddOpen(true)}>
          Add store <i className="fa-solid fa-circle-plus"></i>
        </button>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <motion.div layout className={styles["admin-stores-container"]}>
          <AnimatePresence>
            {stores?.length > 0 ? (
              stores.map((c) => (
                <StoreItem
                  key={c._id}
                  {...c}
                  openEdit={openEdit}
                  openDelete={openDelete}
                />
              ))
            ) : (
              <h2>No stores</h2>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {isAddOpen && (
        <AddStore onClose={onCloseAdd} updateStores={updateStores} />
      )}
      {isEditOpen && (
        <EditStore
          onClose={onCloseEdit}
          id={selectedStore}
          updateStores={updateStores}
        />
      )}

      {isDeleteOpen && (
        <DeleteStore
          onClose={onCloseDelete}
          id={selectedStore}
          updateStores={updateStores}
        />
      )}
    </div>
  );
};

export default Stores;
