import ServicesSectionAdmin from "../features/services/admin-panel/ServicesSectionAdmin";
import useTitle from "../hooks/useTitle";

function AdminServices() {
  useTitle("Admin Panel | Services");

  return (
    <>
      <ServicesSectionAdmin />
    </>
  );
}

export default AdminServices;
