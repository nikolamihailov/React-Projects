import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useAvailableTimeSlots } from "../../../hooks/appointments/useAvailableTimeSlotsQuery";
import Spinner from "../../../components/Spinner/Spinner";
import { useAuth } from "../../../contexts/AuthContext";
import { useMakeAppointmentMutation } from "../../../hooks/appointments/useMakeAppointment";
import { toast } from "react-toastify";
import utc from "dayjs/plugin/utc";
import { UserWithRole } from "../../../types/User";
import { Service } from "../../../types/Service";
import { AccessTime, AttachMoney, Email, Cake } from "@mui/icons-material";
import userAvatar from "/user-avatar.png";
import serviceImg from "/service.png";
import AvailableSlots from "./AvailableSlots";
import {
  FormContainer,
  InfoContainer,
  IconTextContainer,
  FullWidthButtonContainer,
} from "../../../utils/StylesHelper/Appointment";
import { useNavigate } from "react-router-dom";

dayjs.extend(utc);

type MakeAppointmentFormProps = {
  staff: UserWithRole | null;
  service: Service | undefined;
  handleClose: () => void;
};

function MakeAppointmentForm({ staff, service, handleClose }: MakeAppointmentFormProps) {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<Dayjs | null>(null);
  const { mutateAsync, isPending } = useMakeAppointmentMutation();
  const { user, logoutExpiredSession } = useAuth();
  const navigateTo = useNavigate();
  const formattedDate = date?.format("YYYY-MM-DD");

  const {
    data: slots,
    isLoading,
    error,
    refetch,
  } = useAvailableTimeSlots(staff?.id, service?.id, formattedDate);

  useEffect(() => {
    if (date) {
      refetch();
    }
  }, [date, refetch]);

  const handleBookAppointment = () => {
    const formData = {
      serviceId: service?.id,
      staffMemberId: staff?.id,
      clientId: user?.id,
      startTime: selectedTimeSlot?.utc(true).format("YYYY-MM-DDTHH:mm:ss"),
    };
    mutateAsync(formData)
      .then(() => {
        toast.success(`Appointment booked successfully`);
        handleClose();
        navigateTo("/appointments");
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          logoutExpiredSession();
        } else if (error.response?.status === 400) {
          toast.error("Please choose booking hour!");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const changeSelectedTimeSlot = (date: Dayjs | null) => {
    setSelectedTimeSlot(date);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Box>Something went wrong getting time slots</Box>;
  }

  return (
    <form>
      <FormContainer>
        <InfoContainer>
          <Typography variant="h6">Service: {service?.name}</Typography>
          <Box
            component="img"
            src={serviceImg}
            alt="Service"
            sx={{ width: "8rem", margin: "0 auto" }}
          />

          <IconTextContainer>
            <AccessTime />
            <Typography>Duration: {service?.durationMinutes} minutes</Typography>
          </IconTextContainer>

          <IconTextContainer>
            <AttachMoney />
            <Typography>Price: ${service?.price}</Typography>
          </IconTextContainer>

          <Typography variant="h6">
            Staff: {staff?.firstName} {staff?.lastName}
          </Typography>
          <Box
            component="img"
            src={userAvatar}
            alt="Staff"
            sx={{ width: "8rem", margin: "0 auto" }}
          />

          <IconTextContainer>
            <Email />
            <Typography>Email: {staff?.email}</Typography>
          </IconTextContainer>

          <IconTextContainer>
            <Cake />
            <Typography>Age: {staff?.age}</Typography>
          </IconTextContainer>
        </InfoContainer>

        <InfoContainer>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <Box sx={{ width: "100%" }}>
                <DatePicker
                  label="Pick a date"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  minDate={dayjs()}
                />
              </Box>
            </DemoContainer>
          </LocalizationProvider>
          <AvailableSlots
            slots={slots}
            selectedTimeSlot={selectedTimeSlot}
            changeSelectedTimeSlot={changeSelectedTimeSlot}
            date={date}
          />
        </InfoContainer>

        <FullWidthButtonContainer>
          <Button
            onClick={handleBookAppointment}
            variant="contained"
            fullWidth
            disabled={isPending}
          >
            {isPending ? (
              <>
                Booking <CircularProgress size={24} color="inherit" />
              </>
            ) : (
              "Book Appointment"
            )}
          </Button>
          <Button variant="outlined" onClick={handleClose} fullWidth disabled={isPending}>
            Cancel
          </Button>
        </FullWidthButtonContainer>
      </FormContainer>
    </form>
  );
}

export default MakeAppointmentForm;
