import AdminDashboard from "../components/Sections/AdminDashboard/AdminDashboard";
import useTitle from "../hooks/useTitle";

function Admin() {
  useTitle("Admin Panel");
  return (
    <>
      <AdminDashboard />
    </>
  );
}

export default Admin;
