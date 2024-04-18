import { useContext, useEffect, useState } from "react";
import styles from "./DeleteUser.module.css";
import { useNavigate } from "react-router-dom";
import { NotifContext } from "../../../../contexts/NotificationContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import { deleteUser, getProfile } from "../../../../data/services/userService";
import Spinner from "../../../Spinner/Spinner";

const DeleteUser = ({ onClose, id, updateUsers }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    console.log(id);
    const deletedUser = await deleteUser(id);
    if (deletedUser.expMessage) {
      updateNotifs([{ text: deletedUser.expMessage, type: "error" }]);
      navigateTo("/login");
      updateAuth({});
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
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <div className={styles["delete-user"]}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <p>
              Are you sure you want to delete{" "}
              <span>
                {user?.firstName} {user?.lastName}
              </span>
              ?
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

export default DeleteUser;
