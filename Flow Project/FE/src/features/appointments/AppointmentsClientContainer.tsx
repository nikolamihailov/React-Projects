import { Box } from "@mui/material";
import { useAppointmentsClient } from "../../hooks/appointments/useAppointmentsClient";
import { useAuth } from "../../contexts/AuthContext";
import { useCancelAppointmentMutation } from "../../hooks/appointments/useCancelAppointment";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import AppointmentItemClient from "./AppointmentItemClient";
import { AppointmentsGrid } from "../../utils/StylesHelper/Appointment";
import { useState } from "react";

function AppointmentsClientContainer() {
  const [selectedAppointmentId, setSelectedAppointmetId] = useState<number | null>(null);
  const { user, logoutExpiredSession } = useAuth();
  const { data: appointments, isLoading, error, refetch } = useAppointmentsClient(user?.id);
  const { mutateAsync, isPending } = useCancelAppointmentMutation();

  const handleCancelAppointment = (id: number | undefined) => {
    mutateAsync(id)
      .then(() => {
        toast.success("Appointment cancelled successfully");
        refetch();
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          logoutExpiredSession();
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const changeSelectedAppointmentId = (id: number | null) => {
    setSelectedAppointmetId(id);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Box>Something went wrong getting appointments!</Box>;
  }

  return (
    <AppointmentsGrid>
      {appointments?.map((appointment) => {
        return (
          <AppointmentItemClient
            key={appointment.id}
            handleCancelAppointment={handleCancelAppointment}
            appointment={appointment}
            pending={isPending && selectedAppointmentId === appointment.id}
            changeSelectedAppointmentId={changeSelectedAppointmentId}
          />
        );
      })}
      {appointments?.length === 0 && <Box>You do not have any appointments yet.</Box>}
    </AppointmentsGrid>
  );
}

export default AppointmentsClientContainer;
