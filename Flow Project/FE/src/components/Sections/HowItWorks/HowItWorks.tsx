import { Box, Typography, useTheme } from "@mui/material";
import ServiceIcon from "@mui/icons-material/CheckBox";
import SpecialistIcon from "@mui/icons-material/Person";
import ScheduleIcon from "@mui/icons-material/CalendarToday";
import Section from "../../UI/Section/Section";
import SectionInfo from "../SectionInfo";
import { sectionStyles } from "../../../utils/StylesHelper/Section";
import { boxSx, evenStepSx, oddStepSx, stepIconSx } from "../../../utils/StylesHelper/HowItWorks";

function HowItWorks() {
  const theme = useTheme();

  return (
    <Section bgColor={theme.palette.secondary.light} id="how-it-works" style={sectionStyles(theme)}>
      <SectionInfo subheading="How To" heading="Book Your Appointment" />

      <Box sx={boxSx}>
        <Box sx={oddStepSx}>
          <Typography variant="h4">1. Pick a Service</Typography>
          <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
            Browse through our wide range of wellness services, each designed to meet your specific
            needs. Whether you're looking for a relaxing spa treatment, a rejuvenating massage, or a
            focused fitness program, take your time to explore all options and select the one that
            resonates with you the most.
          </Typography>
        </Box>
        <Box>
          <ServiceIcon sx={stepIconSx(theme)} />
        </Box>
      </Box>

      <Box sx={boxSx}>
        <Box sx={{ gridArea: { xs: "icon", sm: "icon", md: "icon" } }}>
          <SpecialistIcon sx={stepIconSx(theme)} />
        </Box>
        <Box sx={{ gridArea: { sx: "text", sm: "text", md: "text" }, ...evenStepSx }}>
          <Typography variant="h4">2. Choose Your Specialist</Typography>
          <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
            After selecting your desired service, it's time to choose the professional who will
            guide you through it. Each of our specialists has a unique set of skills and expertise.
            Read through their profiles, consider their specialties, and choose the one who best
            matches your personal needs and preferences.
          </Typography>
        </Box>
      </Box>

      <Box sx={boxSx}>
        <Box sx={oddStepSx}>
          <Typography variant="h4">3. Confirm and Schedule</Typography>
          <Typography variant="body1" sx={{ fontSize: "1.8rem" }}>
            Once you've selected a service and a specialist, the final step is to choose a time that
            works for you. Our system will show you all available time slots. Simply select the one
            that fits your schedule, review all your choices, and confirm your appointment. You're
            all set for a personalized wellness experience!
          </Typography>
        </Box>
        <Box>
          <ScheduleIcon sx={stepIconSx(theme)} />
        </Box>
      </Box>
    </Section>
  );
}

export default HowItWorks;
