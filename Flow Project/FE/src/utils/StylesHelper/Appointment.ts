import { styled } from "@mui/system";
import { Box } from "@mui/material";

/* Make apoointment form*/
export const FormContainer = styled(Box)(({ theme }) => ({
  padding: "2rem",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "6.4rem",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const InfoContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "2.4rem",
  textAlign: "center",
});

export const IconTextContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
});

export const FullWidthButtonContainer = styled(Box)({
  gridColumn: "1/-1",
  display: "flex",
  alignItems: "center",
  gap: "2.4rem",
});

///////////////////////////////////////////////////////////////
/*Appointment Details */
///////////////////////////////////////////////////////////////
export const DetailsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  fontSize: "2rem",
}));

export const DetailsRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export const DetailsIcon = styled("span")(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
///////////////////////////////////////////////////////////////
/*Available time slots */

export const SlotsContainer = styled(Box)(() => ({
  maxHeight: "40rem",
  overflowY: "auto",
  minWidth: "30rem",
  padding: "1.2rem",
}));

export const SlotBox = styled(Box)<{ isSlotSelected: boolean | null }>(
  ({ theme, isSlotSelected }) => ({
    fontSize: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    boxShadow: isSlotSelected ? `0px 0px 10px ${theme.palette.primary.main}` : "none",
    transition: "box-shadow 0.5s ease",
    "&:hover": {
      boxShadow: `0px 0px 10px ${theme.palette.primary.main}`,
    },
  })
);

export const SlotTimeText = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
///////////////////////////////////////////////////////////////
/* Appointment Staff and Client - Container and Item */
export const AppointmentsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "3.2rem",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

export const AppointmentCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
  justifyContent: "space-between",
  fontSize: "2rem",
}));

// Styled component for the info row
export const InfoRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  fontSize: "1.6rem",
  gap: "0.8rem",
});

///////////////////////////////////////////////////////////////
