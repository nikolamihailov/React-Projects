import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Header/AdminHeader";

function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;
