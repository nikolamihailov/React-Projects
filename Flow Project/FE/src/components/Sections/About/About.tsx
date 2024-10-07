import { Box, Typography, useTheme } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Section from "../../UI/Section/Section";
import Button from "../../UI/Button/Button";
import wellnessImage from "/wellness.jpg";
import spaImage from "/spa.jpg";
import fitnessImage from "/fitness.jpg";
import { sectionStyles } from "../../../utils/StylesHelper/Section";
import {
  aboutImages,
  btnStyles,
  firstPStyles,
  secondPStyles,
} from "../../../utils/StylesHelper/About";
import SectionInfo from "../SectionInfo";

function AboutSection() {
  const theme = useTheme();

  return (
    <Section bgColor={theme.palette.secondary.light} id="about" style={sectionStyles(theme)}>
      <SectionInfo subheading="About" heading="Flow offers variety of services" />
      <Typography variant="body1" sx={firstPStyles}>
        Welcome to FLOW, your ultimate destination for holistic wellness, fitness, and rejuvenation.
        We believe in harmonizing the mind, body, and spirit through personalized experiences that
        elevate your well-being.
      </Typography>
      <Typography variant="body1" sx={secondPStyles}>
        Our mission is to empower individuals to lead healthier, happier lives. We offer a balanced
        approach to wellness, combining modern fitness techniques with luxurious spa treatments and
        wellness services tailored to your unique needs.
      </Typography>
      <Box sx={aboutImages}>
        <Box>
          <img src={spaImage} alt="SPA" />
        </Box>
        <Box>
          <img src={wellnessImage} alt="Wellness" />
        </Box>
        <Box>
          <img src={fitnessImage} alt="Fitness" />
        </Box>
      </Box>
      <Box>
        <Button variant="primary" el="link" href="/services" style={btnStyles}>
          Explore Services <ArrowRightAltIcon />
        </Button>
      </Box>
    </Section>
  );
}

export default AboutSection;
