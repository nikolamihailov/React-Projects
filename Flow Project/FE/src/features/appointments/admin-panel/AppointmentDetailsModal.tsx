import { Button, CircularProgress, Typography } from "@mui/material";
import Modal from "../../../components/UI/Modal/Modal";
import { AccessAlarm, Person, Work, Event } from "@mui/icons-material";
import { Appointment } from "../../../types/Appointment";
import { Status } from "../../../types/Status";
import { useCancelAppointmentMutation } from "../../../hooks/appointments/useCancelAppointment";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import { DetailsRow, DetailsContainer, DetailsIcon } from "../../../utils/StylesHelper/Appointment";

type AppointmentDetailsProps = {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  appointment: Appointment | null;
};

function AppointmentDetailsModal({
  open,
  handleClose,
  appointment,
  refetch,
}: AppointmentDetailsProps) {
  const { mutateAsync, isPending } = useCancelAppointmentMutation();
  const { logoutExpiredSession } = useAuth();

  const handleCancelAppointment = (id: number | undefined) => {
    mutateAsync(id)
      .then(() => {
        toast.success("Appointment cancelled successfully");
        handleClose();
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

  const formatDateTime = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleString();
  };

  return (
    <Modal open={open} handleClose={handleClose} title="Appointment Details">
      <DetailsContainer>
        <DetailsRow>
          <DetailsIcon>
            <AccessAlarm fontSize="small" />
          </DetailsIcon>
          <Typography>Service: {appointment?.service.name}</Typography>
        </DetailsRow>

        <DetailsRow>
          <DetailsIcon>
            <Work fontSize="small" />
          </DetailsIcon>
          <Typography>
            Staff: {appointment?.staffMember.firstName} {appointment?.staffMember.lastName}
          </Typography>
        </DetailsRow>

        <DetailsRow>
          <DetailsIcon>
            <Person fontSize="small" />
          </DetailsIcon>
          <Typography>
            Client: {appointment?.client.firstName} {appointment?.client.lastName}
          </Typography>
        </DetailsRow>

        <DetailsRow>
          <DetailsIcon>
            <Event fontSize="small" />
          </DetailsIcon>
          <Typography>
            Time: {formatDateTime(appointment ? new Date(appointment.startTime) : undefined)} -{" "}
            {formatDateTime(appointment ? new Date(appointment.endTime) : undefined)}
          </Typography>
        </DetailsRow>

        <DetailsRow>
          <Typography>Status: {appointment?.status}</Typography>
        </DetailsRow>

        {appointment?.status === Status.Scheduled && (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleCancelAppointment(appointment?.id)}
            disabled={isPending}
          >
            {isPending ? <CircularProgress size={24} color="inherit" /> : "Cancel Appointment"}
          </Button>
        )}
      </DetailsContainer>
    </Modal>
  );
}

export default AppointmentDetailsModal;
