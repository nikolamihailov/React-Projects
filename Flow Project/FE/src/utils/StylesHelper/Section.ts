import { Theme } from "@mui/material";
import { CSSProperties } from "react";

export const sectionStyles = (theme: Theme): CSSProperties => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "9.6rem 3.2rem",
  textAlign: "center",
  gap: "4.8rem",
  color: theme.palette.primary.main,
});

export const welcomeSection = (theme: Theme): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "6.4rem 3.2rem",
  textAlign: "center",
  gap: "4.8rem",
  color: theme.palette.primary.main,
});
