import AppointmentsSectionAdmin from "../features/appointments/admin-panel/AppointmentsSectionAdmin";
import useTitle from "../hooks/useTitle";

function AdminAppointments() {
  useTitle("Admin Panel | Apponitments");

  return (
    <>
      <AppointmentsSectionAdmin />
    </>
  );
}

export default AdminAppointments;
