import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export const usersAdminSectionStyles = (theme: Theme): CSSProperties => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "9.6rem 3.2rem",
  textAlign: "center",
  gap: "4.8rem",
  color: theme.palette.primary.main,
});

export const userContainerSx = {
  display: "grid",
  columnGap: {
    xs: "4.8rem",
    sm: "4.8rem",
    md: "6.4rem",
  },
  rowGap: {
    xs: "4.8rem",
    sm: "6.4rem",
    md: "9.6rem",
  },
  width: {
    xs: "90%",
    sm: "90%",
    md: "70%",
  },
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    md: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(3, minmax(0, 1fr))",
  },
};

export const userAdminItemSX = (theme: Theme): SxProps => ({
  boxShadow: "0 2.4rem 4.8rem rgba(0, 0, 0, 0.1)",
  borderRadius: "11px",
  overflow: "hidden",
  transition: "all 0.4s",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-1.2rem)",
    boxShadow: "0 3.2rem 6.4rem rgba(0, 0, 0, 0.06)",
  },
  bgcolor: theme.palette.secondary.main,
  position: "relative",
});

export const userItemBoxSx: SxProps = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: {
    xs: "1.6rem",
    sm: "2.4rem",
    md: "3.2rem",
  },
  padding: {
    xs: "1.6rem",
    sm: "2.4rem",
    md: "3.2rem",
  },
};

export const userItemChipSx = (theme: Theme) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.secondary.main,
  fontWeight: 600,
  fontSize: "1.2rem",
  borderRadius: "100px",
  textTransform: "uppercase",
  padding: "0.4rem 0.8rem",
});

export const userItemListSx: SxProps = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: 0,
};

export const userItemListItemSx: SxProps = {
  fontSize: {
    xs: "1.6rem",
    sm: "1.8rem",
    md: "2rem",
  },
  display: "flex",
  flexWrap: "wrap",
  wordBreak: "break-word",
  whiteSpace: "normal",
  alignItems: "center",
  gap: "1.6rem",
  padding: 0,
};

export const userItemAvatarSx: SxProps = {
  backgroundColor: "transparent",
};

export const userIconSx = (theme: Theme): SxProps => ({
  color: theme.palette.primary.light,
  width: {
    xs: "2.2rem",
    sm: "2.4rem",
    md: "2.8rem",
  },
  height: {
    xs: "2.2rem",
    sm: "2.4rem",
    md: "2.8rem",
  },
});

export const userItemAdminBtnSx = (theme: Theme): SxProps => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  padding: {
    xs: "0.6rem 1.2rem",
    sm: "0.8rem 1.4rem",
    md: "0.8rem 1.6rem",
  },
  bgcolor: theme.palette.primary.main,
  ":hover": {
    bgcolor: theme.palette.primary.light,
  },
  color: theme.palette.secondary.main,
  borderRadius: "0.8rem",
});

export const selectItemsAndBtnSx = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  alignItems: "center",
  gap: "4.8rem",
};
