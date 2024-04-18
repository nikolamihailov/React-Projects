import { useContext, useEffect, useState } from "react";
import styles from "./DeleteStore.module.css";
import { useNavigate } from "react-router-dom";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { deleteStore, getOne } from "../../../../data/services/storeService";
import Spinner from "../../../Spinner/Spinner";

const DeleteStore = ({ onClose, id, updateStores }) => {
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getOne(id)
      .then((data) => setStore(data))
      .finally(() => setIsLoading(false));
  }, [id]);

  const onDelete = async () => {
    const deletedStore = await deleteStore(id);
    if (deletedStore.expMessage) {
      updateNotifs([{ text: deletedStore.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
    }

    if (deletedStore.error) {
      updateNotifs([{ text: deletedStore.error, type: "error" }]);
    } else {
      updateStores((stores) => stores.filter((s) => s._id !== deletedStore._id));
      updateNotifs([
        {
          text: `Store - KolPlace ${deletedStore.city} deleted!`,
          type: "success",
        },
      ]);
      onClose();
      navigateTo("/admin-panel/stores");
    }
  };
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className={styles["delete-store"]}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <p>
              Are you sure you want to delete <span>{store?.city} </span> store?
            </p>
            <div className={styles["btns"]}>
              <button onClick={onDelete}>Ok</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DeleteStore;
