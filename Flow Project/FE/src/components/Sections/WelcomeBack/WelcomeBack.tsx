import { Box, Typography, useTheme } from "@mui/material";
import Section from "../../UI/Section/Section";
import Button from "../../UI/Button/Button";
import { welcomeSection } from "../../../utils/StylesHelper/Section";
import { callToActionBtns } from "../../../utils/StylesHelper/WelcomeBack";
import { useAuth } from "../../../contexts/AuthContext";
import { RoleTypes } from "../../../types/Role";

function WelcomeBack() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <Section bgColor={theme.palette.secondary.dark} id="welcome-back" style={welcomeSection(theme)}>
      <Typography variant="h4" sx={{ fontSize: "4rem" }}>
        Welcome back, {user?.firstName}!
      </Typography>
      <Typography
        variant="body1"
        color={theme.palette.primary.light}
        sx={{ fontSize: "2rem", fontWeight: "500" }}
      >
        Ready for your next wellness journey? Let’s get started.
      </Typography>
      <Box sx={callToActionBtns}>
        <Button variant="primary" el="link" href="/services">
          Explore Services
        </Button>
        {user?.role === RoleTypes.User && (
          <Button variant="secondary" el="link" href="/appointments">
            Make Appointment
          </Button>
        )}
      </Box>
    </Section>
  );
}

export default WelcomeBack;
