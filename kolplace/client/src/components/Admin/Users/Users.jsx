import { useCallback, useEffect, useState } from "react";
import AdminListPage from "../AdminListPage/AdminListPage";
import { getAllWithFilters } from "../../../data/services/userService";
import UserProfile from "./UserProfile/UserProfile";
import usePagination from "../../../hooks/usePagination";
import FilterUsersBySort from "../../Filters/AdminFilters/UserFilter/FilterUsersBySort";
import DeleteUser from "./DeleteUser/DeleteUser";

const Users = () => {
  const { page, pageCount, prevPage, nextPage, switchToPage, updatePageCount, resetPage } =
    usePagination();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [sortFilter, setSortFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [pageSize, setPageSize] = useState(null);
  const onPageSizeChange = useCallback((size) => {
    setPageSize(size);
    resetPage();
  }, [resetPage]);

  useEffect(() => {
    if (!pageSize) return;
    getAllWithFilters(page, sortFilter, pageSize)
      .then((data) => {
        setUsers(data.users);
        updatePageCount(data.pageCount);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [updatePageCount, page, sortFilter, pageSize]);

  const updateUsers = useCallback((data) => setUsers(data), []);

  const openDelete = useCallback((id) => {
    setDeleteOpen(true);
    setSelectedUser(id);
  }, []);

  const onCloseDelete = useCallback(() => setDeleteOpen(false), []);

  const onSortFilterChange = useCallback((e) => {
    setSortFilter(e.target.value);
    resetPage();
  }, [resetPage]);

  return (
    <AdminListPage
      title="Users"
      filters={<FilterUsersBySort onChange={onSortFilterChange} />}
      isLoading={isLoading}
      isEmpty={!users?.length}
      emptyText="No users"
      minItemWidth={14.375}
      onPageSizeChange={onPageSizeChange}
      pagination={{ page, pageCount, prevPage, nextPage, switchToPage }}
      overlays={
        deleteOpen && (
          <DeleteUser onClose={onCloseDelete} updateUsers={updateUsers} id={selectedUser} />
        )
      }
    >
      {users?.map((u) => (
        <UserProfile key={u._id} {...u} openDelete={openDelete} />
      ))}
    </AdminListPage>
  );
};

export default Users;
