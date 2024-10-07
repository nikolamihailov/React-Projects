import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { detailsStyles, summaryStyles } from "../../../../utils/StylesHelper/FAQ";

type AccordionProps = {
  summary: string;
  details: string;
};

function FAQAccordion({ summary, details }: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <Accordion expanded={isExpanded} onChange={() => setIsExpanded((ex) => !ex)}>
      <AccordionSummary
        expandIcon={
          isExpanded ? (
            <RemoveIcon fontSize="large" color="secondary" />
          ) : (
            <AddIcon fontSize="large" color="secondary" />
          )
        }
        aria-controls="panel1-content"
        id="panel1-header"
        sx={summaryStyles(theme)}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails sx={detailsStyles}>{details}</AccordionDetails>
    </Accordion>
  );
}

export default FAQAccordion;
