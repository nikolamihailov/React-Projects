import { Theme } from "@mui/material";

export const logoutBtnSX = (theme: Theme) => ({
  textDecoration: "none",
  fontSize: "2rem",
  fontWeight: 700,
  backgroundColor: "transparent",
  textTransform: "none",
  padding: 0,
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.secondary.dark,
  },
});
