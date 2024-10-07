import { Theme } from "@mui/material/styles";

function generateCssVariables(theme: Theme) {
  const root = document.documentElement;

  // primary colors
  root.style.setProperty("--color-primary-main", theme.palette.primary.main);
  root.style.setProperty("--color-primary-light", theme.palette.primary.light);
  root.style.setProperty("--color-primary-dark", theme.palette.primary.dark);

  // secondary colors
  root.style.setProperty("--color-secondary-main", theme.palette.secondary.main);
  root.style.setProperty("--color-secondary-light", theme.palette.secondary.light);
  root.style.setProperty("--color-secondary-dark", theme.palette.secondary.dark);
}

export default generateCssVariables;
