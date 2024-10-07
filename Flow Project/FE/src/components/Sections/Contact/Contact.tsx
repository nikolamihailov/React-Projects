import { Box, Typography, useTheme } from "@mui/material";
import Section from "../../UI/Section/Section";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { sectionStyles } from "../../../utils/StylesHelper/Section";
import { contactSectionStyles } from "../../../utils/StylesHelper/Contact";
import SectionInfo from "../SectionInfo";

function ContactSection() {
  const theme = useTheme();
  const styles = contactSectionStyles(theme);

  return (
    <Section bgColor={theme.palette.secondary.dark} id="contact" style={sectionStyles(theme)}>
      <SectionInfo subheading="Contact" heading="Get in touch with us" />
      <Typography variant="body1" sx={styles.textBoxStyles}>
        Whether you have a question about our services, pricing, or anything else, our team is ready
        to answer all your questions. We’re here to help you find the best wellness solutions
        tailored to your needs, so don’t hesitate to reach out.
      </Typography>

      <Box sx={styles.containerStyles}>
        <Box sx={styles.iconBoxStyles}>
          <PhoneIcon sx={styles.iconStyles} />
          <Typography variant="h6" component="a" href="tel:+754-547-653" sx={styles.linkStyles}>
            +754-547-653
          </Typography>
        </Box>
        <Box sx={styles.iconBoxStyles}>
          <EmailIcon sx={styles.iconStyles} />
          <Typography
            variant="h6"
            component="a"
            href="mailto:flow-support@bot.com"
            sx={styles.linkStyles}
          >
            flow-support@bot.com
          </Typography>
        </Box>
      </Box>
    </Section>
  );
}

export default ContactSection;
