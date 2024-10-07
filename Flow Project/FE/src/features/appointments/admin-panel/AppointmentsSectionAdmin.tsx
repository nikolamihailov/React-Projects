import Section from "../../../components/UI/Section/Section";
import { useAppointmentsAdminQuery } from "../../../hooks/appointments/useAppointmentsAdmin";
import { Typography, useTheme, Box } from "@mui/material";
import Spinner from "../../../components/Spinner/Spinner";
import SectionInfo from "../../../components/Sections/SectionInfo";
import { usePagination } from "../../../hooks/usePagination";
import SelectItemsPerPage from "../../../components/PaginationAndSelectItems/SelectItemsPerPage";
import Pagination from "../../../components/PaginationAndSelectItems/Pagination";
import { sectionStyles } from "../../../utils/StylesHelper/Section";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Appointment, AppointmentEvent, StatusTypeParam } from "../../../types/Appointment";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import AppointmentTypeButtonGroup from "./AppointmentTypeBtnGroup";
import AppointmentCalendar from "./Calendar";

const APPOINTMENT_SELECT_OPTIONS = [20, 40, 60, 80];

function AppointmentsSectionAdmin() {
  const [activeAppointmentType, setActiveAppointmentType] = useState<StatusTypeParam>(
    StatusTypeParam.All
  );
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { page, handleItemsPerPageChange, itemsPerPage, handlePageChange, resetPage } =
    usePagination(0, 20);
  const { data, isLoading, error, refetch } = useAppointmentsAdminQuery(
    page,
    itemsPerPage,
    activeAppointmentType
  );

  const handleOpen = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChangeAppointmentType = (type: StatusTypeParam) => {
    setActiveAppointmentType(type);
    resetPage();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Typography>Error loading services</Typography>;
  }

  const events: AppointmentEvent[] | undefined = data?.content?.map((appointment) => ({
    title: `${appointment.service.name} with ${appointment.staffMember.firstName} ${appointment.staffMember.lastName}`,
    start: new Date(appointment.startTime),
    end: new Date(appointment.endTime),
    allDay: false,
    status: appointment.status,
    appointmentDetails: appointment,
  }));

  return (
    <Section bgColor={theme.palette.secondary.light} style={sectionStyles(theme)}>
      <SectionInfo heading="Appointments" subheading="Admin Panel" />

      <AppointmentTypeButtonGroup
        activeAppointmentType={activeAppointmentType}
        onChange={handleChangeAppointmentType}
      />
      <Box>
        <SelectItemsPerPage
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemName="Appointments"
          selectOptionsNumbers={APPOINTMENT_SELECT_OPTIONS}
        />
      </Box>

      <AppointmentCalendar
        events={events}
        onSelectEvent={(event) => handleOpen(event.appointmentDetails)}
      />

      <Pagination totalPages={data?.totalPages || 0} page={page} onPageChange={handlePageChange} />

      <AppointmentDetailsModal
        open={open}
        handleClose={handleClose}
        refetch={refetch}
        appointment={selectedAppointment}
      />
    </Section>
  );
}

export default AppointmentsSectionAdmin;
