import { ButtonGroup, Button, useTheme } from "@mui/material";
import { StatusTypeParam } from "../../../types/Appointment";

type AppointmentTypeButtonGroupProps = {
  activeAppointmentType: StatusTypeParam;
  onChange: (type: StatusTypeParam) => void;
};

const AppointmentTypeButtonGroup = ({
  activeAppointmentType,
  onChange,
}: AppointmentTypeButtonGroupProps) => {
  const theme = useTheme();

  const buttonStyles = (type: StatusTypeParam) => ({
    backgroundColor:
      activeAppointmentType === type ? theme.palette.primary.light : theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    transition: "all 0.5s linear",
  });

  return (
    <ButtonGroup
      variant="contained"
      aria-label="Type of users"
      color="primary"
      sx={{
        borderRadius: "1.5rem",
        border: `3px solid ${theme.palette.primary.light}`,
        overflow: "hidden",
      }}
    >
      <Button sx={buttonStyles(StatusTypeParam.All)} onClick={() => onChange(StatusTypeParam.All)}>
        All
      </Button>
      <Button
        sx={buttonStyles(StatusTypeParam.Scheduled)}
        onClick={() => onChange(StatusTypeParam.Scheduled)}
      >
        Scheduled
      </Button>
      <Button
        sx={buttonStyles(StatusTypeParam.Cancelled)}
        onClick={() => onChange(StatusTypeParam.Cancelled)}
      >
        Cancelled
      </Button>
    </ButtonGroup>
  );
};

export default AppointmentTypeButtonGroup;
