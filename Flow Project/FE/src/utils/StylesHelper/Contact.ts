import { Theme } from "@mui/material";

export const contactSectionStyles = (theme: Theme) => ({
  textBoxStyles: {
    lineHeight: 1.8,
    fontSize: "2rem",
    width: { xs: "100%", md: "70%" },
  },
  iconBoxStyles: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "1rem",
    color: theme.palette.primary.main,
  },
  iconStyles: {
    fontSize: "3.6rem",
  },
  linkStyles: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  containerStyles: {
    display: "flex",
    gap: "4.8rem",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
