import Button from "../../UI/Button/Button";
import Section from "../../UI/Section/Section";
import GroupAvatars from "./GroupAvatars/GroupAvatars";
import heroImg from "/hero-img.jpg";
import styles from "./Hero.module.css";
import { Box, useTheme } from "@mui/material";

function HeroSection() {
  const theme = useTheme();

  return (
    <Section bgColor={theme.palette.secondary.dark}>
      <div className={styles["hero"]}>
        <div className={styles["text-box"]}>
          <h1>Welcome to Your Ultimate Wellness Retreat</h1>
          <p className={styles["desc"]}>
            We at <strong style={{ fontSize: "2rem" }}>FLOW</strong> give you the opportunity to
            rejuvenate your mind, body, and spirit in our serene oasis. Embrace tranquility and
            wellness with our personalized treatments and fitness programs.
          </p>
          <Box>
            <Button variant="primary" el="link" href="/services">
              Explore Services
            </Button>
            <Button variant="secondary" el="link" href="/appointments">
              Make Appointment
            </Button>
          </Box>
          <div className={styles["happy-clients"]}>
            <GroupAvatars />
            <p className={styles["happy-clients-text"]}>
              <span>50,000+</span> happy clients last year!
            </p>
          </div>
        </div>
        <div className={styles["img-box"]}>
          <img src={heroImg} alt="SPA studio" />
        </div>
      </div>
    </Section>
  );
}

export default HeroSection;
