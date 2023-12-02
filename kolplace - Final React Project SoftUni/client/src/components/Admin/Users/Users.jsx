import { useCallback, useEffect, useState } from "react";
import styles from "./Users.module.css";
import { getAllWithFilters } from "../../../data/services/userService";
import Spinner from "../../Spinner/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import UserProfile from "./UserProfile/UserProfile";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../Pagination/Pagination";
import FilterUsersBySort from "../../Filters/AdminFilters/UserFilter/FilterUsersBySort";
import DeleteUser from "./DeleteUser/DeleteUser";

const Users = () => {
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount } =
    usePagination();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [sortFilter, setSortFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getAllWithFilters(page, sortFilter)
      .then((data) => {
        setUsers(data.users);
        updatePageCount(data.pageCount);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [updatePageCount, page, sortFilter]);

  const updateUsers = useCallback((data) => setUsers(data), []);

  const openDelete = useCallback((id) => {
    setDeleteOpen(true);
    setSelectedUser(id);
  }, []);

  const onCloseDelete = useCallback(() => setDeleteOpen(false), []);

  const onSortFilterChange = useCallback(
    (e) => setSortFilter(e.target.value),
    []
  );

  return (
    <section className={styles["admin-users"]}>
      <h1>All Users</h1>
      <div className={styles["admin-users-top"]}>
        <FilterUsersBySort onChange={onSortFilterChange} />
      </div>
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
      {deleteOpen && (
        <DeleteUser
          onClose={onCloseDelete}
          updateUsers={updateUsers}
          id={selectedUser}
        />
      )}
      {pageCount > 1 && (
        <Pagination
          page={page}
          pageCount={pageCount}
          prevPage={prevPage}
          nextPage={nextPage}
          switchToPage={switchToPage}
        />
      )}
    </section>
  );
};

export default Users;
