import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const accordionContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "4.8rem",
  fontSize: "2.2rem",
  width: {
    xs: "95%",
    sm: "75%",
    md: "75rem",
  },
};

export const summaryStyles = (theme: Theme): SxProps => ({
  color: theme.palette.secondary.main,
  padding: "1.6rem",
  backgroundColor: theme.palette.primary.light,
});

export const detailsStyles: SxProps = {
  fontSize: "2rem",
  padding: "2.4rem",
};
