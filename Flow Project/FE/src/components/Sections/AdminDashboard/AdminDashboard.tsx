import { Box, Typography, useTheme } from "@mui/material";
import { sectionStyles } from "../../../utils/StylesHelper/Section";
import Section from "../../UI/Section/Section";
import SectionInfo from "../SectionInfo";

function AdminDashboard() {
  const theme = useTheme();
  return (
    <Section
      bgColor={theme.palette.secondary.light}
      style={{ height: "100%", ...sectionStyles(theme) }}
    >
      <SectionInfo heading="Welcome to the Admin Panel" subheading="Manage Your Dashboard" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "4.8rem" }}>
        <Typography variant="body1" sx={{ marginBottom: theme.spacing(2), fontSize: "2rem" }}>
          Welcome to the Admin Panel. Here you can manage various aspects of the system including:
        </Typography>
        <Box>
          <Typography component="li" variant="body1" sx={{ fontSize: "2rem" }}>
            <strong>User Management:</strong> Create, update, and delete user accounts.
          </Typography>
          <Typography component="li" variant="body1" sx={{ fontSize: "2rem" }}>
            <strong>Service Management:</strong> Add, edit, or remove services offered.
          </Typography>
          <Typography component="li" variant="body1" sx={{ fontSize: "2rem" }}>
            <strong>Appointment Management:</strong> View all appointments, filter them by status
            and cancel if necessary.
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontSize: "2rem" }}>
          Use the navigation menu to access different sections and perform CRUD operations as
          needed.
        </Typography>
      </Box>
    </Section>
  );
}

export default AdminDashboard;
