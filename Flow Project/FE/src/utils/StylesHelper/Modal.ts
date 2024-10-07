import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const modalSX = (theme: Theme): SxProps => ({
  position: "relative",
  width: "100%",
  maxWidth: "60rem",
  padding: "2rem",
  bgcolor: theme.palette.secondary.main,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "3.2rem",
});

export const dialogTitleSx: SxProps = {
  m: 0,
  p: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
