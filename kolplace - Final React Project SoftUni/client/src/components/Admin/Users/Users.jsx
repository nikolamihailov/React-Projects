import { useCallback, useEffect, useState } from "react";
import styles from "./Users.module.css";
import { getAllUsers } from "../../../data/services/userService";
import Spinner from "../../Spinner/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import UserProfile from "./UserProfile/UserProfile";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const openDelete = useCallback(() => setDeleteOpen(true), []);

  return (
    <section className={styles["admin-users"]}>
      <h1>All Users</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <motion.div layout className={styles["admin-users-container"]}>
          <AnimatePresence>
            {users?.length > 0 ? (
              users.map((p) => (
                <UserProfile key={p._id} {...p} openDelete={openDelete} />
              ))
            ) : (
              <h2>No users</h2>
            )}
          </AnimatePresence>
        </motion.div>
      )}
      {deleteOpen && <h2>Open</h2>}
    </section>
  );
};

export default Users;
