import { Typography, useTheme } from "@mui/material";
import Section from "../components/UI/Section/Section";
import errorImg from "/sad.png";
import useTitle from "../hooks/useTitle";
import { errorImgSadFace, errorP, errorPageStyles } from "../utils/StylesHelper/ErrorPage";
import Button from "../components/UI/Button/Button";
import { Box } from "@mui/system";

function ErrorPage() {
  const theme = useTheme();

  useTitle("Error Page | Flow - SPA and Fitness");

  return (
    <Section bgColor={theme.palette.secondary.dark} style={errorPageStyles(theme)}>
      <h1 className="heading-primary">Looks Like We're Lost!</h1>
      <Typography variant="body1" sx={errorP(theme)}>
        Sometimes even the best journey needs a little redirection. Let's find our way back to
        wellness!
      </Typography>
      <Box component="img" src={errorImg} alt="sad face" sx={errorImgSadFace} />
      <Button variant="secondary" el="link" href="/home">
        Go Home
      </Button>
    </Section>
  );
}

export default ErrorPage;
