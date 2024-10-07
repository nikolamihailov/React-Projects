import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useTheme } from "@mui/material";
import CustomToolbar from "../CalendarToolBar";
import { AppointmentEvent } from "../../../types/Appointment";
import { Status } from "../../../types/Status";

const localizer = momentLocalizer(moment);

type AppointmentCalendarProps = {
  events: AppointmentEvent[] | undefined;
  onSelectEvent: (event: AppointmentEvent) => void;
};

const AppointmentCalendar = ({ events, onSelectEvent }: AppointmentCalendarProps) => {
  const theme = useTheme();

  const eventPropGetter = (event: AppointmentEvent) => {
    let backgroundColor = theme.palette.primary.main;

    if (event.status === Status.Canceled) {
      backgroundColor = theme.palette.error.main;
    }

    return {
      style: {
        backgroundColor,
        color: theme.palette.secondary.main,
      },
    };
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      eventPropGetter={eventPropGetter}
      style={{ height: 600, width: "90%", fontSize: "1.8rem" }}
      onSelectEvent={onSelectEvent}
      components={{
        toolbar: CustomToolbar,
      }}
    />
  );
};

export default AppointmentCalendar;
