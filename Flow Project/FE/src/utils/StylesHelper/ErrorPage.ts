import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export const errorPageStyles = (theme: Theme): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  height: "100%",
  gap: "4.8rem",
  padding: "9.6rem 3.2rem",
});

export const errorP = (theme: Theme): SxProps => ({
  fontSize: "2rem",
  maxWidth: "600px",
  textAlign: "center",
  color: theme.palette.primary.main,
});

export const errorImgSadFace: SxProps = {
  width: { xs: "16rem", sm: "24rem" },
};
