import { useTheme } from "@mui/material";
import Section from "../components/UI/Section/Section";
import errorImg from "/sad.png";
import useTitle from "../hooks/useTitle";
import { errorPageStyles } from "../utils/StylesHelper/ErrorPage";
import Button from "../components/UI/Button/Button";

function ErrorPage() {
  const theme = useTheme();

  useTitle("Error Page | Flow - SPA and Fitness");

  return (
    <Section bgColor={theme.palette.secondary.dark} style={errorPageStyles(theme)}>
      <h1 className="heading-primary">Looks Like We're Lost!</h1>
      <img src={errorImg} alt="sad face" style={{ width: "30rem" }} />
      <Button variant="secondary" el="link" href="/home">
        Go Home
      </Button>
    </Section>
  );
}

export default ErrorPage;
