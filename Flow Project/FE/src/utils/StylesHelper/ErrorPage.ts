import { Theme } from "@mui/material";
import { CSSProperties } from "react";

export const errorPageStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  height: "100%",
  gap: "4.8rem",
});
