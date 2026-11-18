import { useContext, useEffect, useState } from "react";
import { ConfirmDialog } from "../../AdminModal/AdminModal";
import { useNavigate } from "react-router-dom";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { deleteStore, getOne } from "../../../../data/services/storeService";

const DeleteStore = ({ onClose, id, updateStores }) => {
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
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
      return;
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
  const confirmDelete = async () => {
    setIsBusy(true);
    try {
      await onDelete();
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <ConfirmDialog
      title="Delete store"
      onConfirm={confirmDelete}
      onClose={onClose}
      isLoading={isLoading}
      isBusy={isBusy}
    >
      <p>
          Delete the <strong>{store?.city}</strong> store? This can&apos;t be undone.
        </p>
    </ConfirmDialog>
  );
};

export default DeleteStore;
