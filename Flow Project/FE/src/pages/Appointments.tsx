import MyAppointments from "../features/appointments/MyAppointments";
import useTitle from "../hooks/useTitle";

function Appointments() {
  useTitle("Appointments | Flow - SPA and Fitness");

  return (
    <>
      <MyAppointments />
    </>
  );
}

export default Appointments;
