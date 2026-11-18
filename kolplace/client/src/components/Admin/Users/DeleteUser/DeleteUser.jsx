import { useContext, useEffect, useState } from "react";
import { ConfirmDialog } from "../../AdminModal/AdminModal";
import { useNavigate } from "react-router-dom";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { deleteUser, getProfile } from "../../../../data/services/userService";

const DeleteUser = ({ onClose, id, updateUsers }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const navigateTo = useNavigate();
  const { updateNotifs } = useContext(NotifContext);
  const { updateAuth } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    getProfile(id)
      .then((data) => setUser(data))
      .finally(() => setIsLoading(false));
  }, [id]);

  const onDelete = async () => {
    const deletedUser = await deleteUser(id);
    if (deletedUser.expMessage) {
      updateNotifs([{ text: deletedUser.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
      return;
    }
    if (deletedUser.error) {
      updateNotifs([{ text: deletedUser.error, type: "error" }]);
    } else {
      updateUsers((users) => users.filter((u) => u._id !== deletedUser._id));
      updateNotifs([
        {
          text: `User - ${deletedUser.firstName} ${deletedUser.lastName} deleted!`,
          type: "success",
        },
      ]);
      onClose();
      navigateTo("/admin-panel/users");
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
      title="Delete user"
      onConfirm={confirmDelete}
      onClose={onClose}
      isLoading={isLoading}
      isBusy={isBusy}
    >
      <p>
          Delete <strong>{user?.firstName} {user?.lastName}</strong>? Their shopping cart is deleted
          too. This can&apos;t be undone.
        </p>
    </ConfirmDialog>
  );
};

export default DeleteUser;
