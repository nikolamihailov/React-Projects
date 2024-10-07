import { SxProps, Theme } from "@mui/material";

export const boxSx: SxProps = {
  padding: "2rem 0",
  display: "grid",
  gridTemplateColumns: { sm: "1fr", md: "auto 1fr" },
  gridTemplateAreas: {
    xs: `"text" "icon"`,
    sm: `"text" "icon"`,
    md: `"icon text"`,
  },
  alignItems: "center",
  gap: "6.4rem",
  width: {
    sm: "100%",
    md: "80rem",
  },
};

export const oddStepSx: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "3.2rem",
  textAlign: { xs: "center", sm: "center", md: "left" },
};

export const evenStepSx: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "3.2rem",
  textAlign: { xs: "center", sm: "center", md: "right" },
};

export const stepIconSx = (theme: Theme): SxProps => ({
  fontSize: "8rem",
  color: theme.palette.primary.light,
});
