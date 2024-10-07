import { Box, Button } from "@mui/material";
import { ToolbarProps } from "react-big-calendar";
import { AppointmentEvent } from "../../types/Appointment";
import { useState, useEffect } from "react";

interface CustomToolbarProps extends ToolbarProps<AppointmentEvent, object> {}

const CustomToolbar = (toolbar: CustomToolbarProps) => {
  const [activeView, setActiveView] = useState("month");
  const [currentDate, setCurrentDate] = useState<Date>(toolbar.date);

  useEffect(() => {
    setCurrentDate(toolbar.date);
  }, [toolbar.date]);

  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };

  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };

  const goToToday = () => {
    toolbar.onNavigate("TODAY");
  };

  const goToMonth = () => {
    toolbar.onView("month");
    setActiveView("month");
  };

  const goToWeek = () => {
    toolbar.onView("week");
    setActiveView("week");
  };

  const goToDay = () => {
    toolbar.onView("day");
    setActiveView("day");
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box
      sx={{
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
        },
        gap: "3.2rem",
      }}
    >
      <Box>
        <Button
          onClick={goToToday}
          variant="contained"
          color="primary"
          sx={{
            marginRight: 2,
            backgroundColor: activeView === "today" ? "primary.light" : undefined,
          }}
        >
          Today
        </Button>
        <Button
          onClick={goToBack}
          variant="contained"
          color="primary"
          sx={{
            marginRight: 2,
            backgroundColor: activeView === "back" ? "primary.light" : undefined,
          }}
        >
          Back
        </Button>
        <Button
          onClick={goToNext}
          variant="contained"
          color="primary"
          sx={{ backgroundColor: activeView === "next" ? "primary.light" : undefined }}
        >
          Next
        </Button>
      </Box>
      <Box>{formattedDate}</Box>
      <Box>
        <Button
          onClick={goToMonth}
          variant="outlined"
          color="primary"
          sx={{
            marginRight: 2,
            backgroundColor: activeView === "month" ? "primary.light" : undefined,
          }}
        >
          Month
        </Button>
        <Button
          onClick={goToWeek}
          variant="outlined"
          color="primary"
          sx={{
            marginRight: 2,
            backgroundColor: activeView === "week" ? "primary.light" : undefined,
          }}
        >
          Week
        </Button>
        <Button
          onClick={goToDay}
          variant="outlined"
          color="primary"
          sx={{ backgroundColor: activeView === "day" ? "primary.light" : undefined }}
        >
          Day
        </Button>
      </Box>
    </Box>
  );
};

export default CustomToolbar;
