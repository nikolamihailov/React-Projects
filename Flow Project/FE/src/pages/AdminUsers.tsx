import UsersSectionAdmin from "../features/user/admin-panel/UsersSectionAdmin";
import useTitle from "../hooks/useTitle";

function AdminUsers() {
  useTitle("Admin Panel | Users");

  return (
    <>
      <UsersSectionAdmin />
    </>
  );
}

export default AdminUsers;
