import Section from "../../components/UI/Section/Section";
import SectionInfo from "../../components/Sections/SectionInfo";
import { useAuth } from "../../contexts/AuthContext";
import { Button, useTheme } from "@mui/material";
import { RoleTypes } from "../../types/Role";
import AppointmentsStaffContainer from "./AppointmentsStaffContainer";
import AppointmentsClientContainer from "./AppointmentsClientContainer";
import { sectionStyles } from "../../utils/StylesHelper/Section";
import Spinner from "../../components/Spinner/Spinner";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MyAppointments() {
  const theme = useTheme();
  const navigateTo = useNavigate();
  const { user, logoutExpiredSession, isLoading } = useAuth();

  const navigateToServices = useCallback(() => {
    navigateTo("/services");
    toast.info("Choose your desired service, pick specialist and hour.");
  }, [navigateTo]);

  if (!user && isLoading) {
    return <Spinner />;
  }

  if (!user && !isLoading) {
    logoutExpiredSession();
    return null;
  }

  return (
    <Section bgColor={theme.palette.secondary.dark} style={sectionStyles(theme)}>
      <SectionInfo heading="My Appointments" subheading="Browse" />
      {user?.role === RoleTypes.User && (
        <Button color="primary" variant="contained" onClick={() => navigateToServices()}>
          Book Appointment
        </Button>
      )}
      {user?.role === RoleTypes.Staff ? (
        <AppointmentsStaffContainer />
      ) : (
        <AppointmentsClientContainer />
      )}
    </Section>
  );
}

export default MyAppointments;
