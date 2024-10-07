import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

export const aboutImages: SxProps = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  gap: "3.2rem",
  justifyContent: "center",
  alignItems: "center",
  "& div": {
    width: "100%",
    maxWidth: "25rem",
    height: "25rem",
    overflow: "hidden",
    borderRadius: "8px",
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  "& div:hover img": {
    transform: "scale(1.1)",
  },
};

export const firstPStyles: SxProps = {
  lineHeight: 1.8,
  fontSize: "2rem",
  width: { xs: "100%", md: "70%" },
};

export const secondPStyles: SxProps = {
  lineHeight: 1.8,
  fontSize: "2rem",
  width: { xs: "100%", md: "70%" },
};

export const btnStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.8rem",
};
