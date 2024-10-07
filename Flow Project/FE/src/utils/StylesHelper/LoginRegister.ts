import { Theme } from "@mui/material";

export const sectionStyles = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4.8rem 0.8rem",
};

export const boxSX = (theme: Theme, isRegister: boolean) => ({
  width: {
    xs: "90%",
    sm: isRegister ? "80vw" : "40rem",
    md: isRegister ? "80rem" : "unset",
  },
  margin: "auto",
  padding: 4,
  marginTop: "4.8rem",
  border: "1px solid #ccc",
  borderRadius: "1rem",
  boxShadow: "0 0 16px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
  bgcolor: theme.palette.secondary.main,
});

export const buttonSX = (theme: Theme, isRegister: boolean) => {
  const styles = {
    padding: "1rem",
    bgcolor: theme.palette.primary.main,
    ":hover": { bgcolor: "#572000" },
  };

  return isRegister
    ? {
        ...styles,
        gridColumn: "1/-1",
      }
    : styles;
};

export const loginFormSX = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2.4rem",
};

export const registerFormSX = {
  width: "100%",
  display: "grid",
  gap: "2.4rem",
  alignItems: "center",
  gridTemplateColumns: {
    sm: "1fr",
    md: "repeat(2, minmax(0, 1fr))",
  },
};
