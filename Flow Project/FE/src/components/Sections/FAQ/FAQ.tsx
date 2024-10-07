import { Box, useTheme } from "@mui/material";
import Section from "../../UI/Section/Section";
import { FAQData } from "../../../utils/FAQ/qustionsAndAnswers";
import FAQAccordion from "./Accordion/FAQAccordion";
import { accordionContainer } from "../../../utils/StylesHelper/FAQ";
import { sectionStyles } from "../../../utils/StylesHelper/Section";
import SectionInfo from "../SectionInfo";

function FAQ() {
  const theme = useTheme();

  return (
    <Section bgColor={theme.palette.secondary.light} style={sectionStyles(theme)}>
      <SectionInfo subheading="FAQS" heading="You Ask, We Answer" />
      <Box sx={accordionContainer}>
        {FAQData.map((data) => {
          return <FAQAccordion key={data.question} summary={data.question} details={data.answer} />;
        })}
      </Box>
    </Section>
  );
}

export default FAQ;
