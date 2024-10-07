import { Button, Typography, useTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { TimeSlot } from "../../../types/Appointment";
import { SlotsContainer, SlotBox, SlotTimeText } from "../../../utils/StylesHelper/Appointment";

type AvailableSlotsProps = {
  date: Dayjs | null;
  slots: TimeSlot[] | undefined;
  selectedTimeSlot: Dayjs | null;
  changeSelectedTimeSlot: (time: Dayjs | null) => void;
};

function AvailableSlots({
  date,
  slots,
  selectedTimeSlot,
  changeSelectedTimeSlot,
}: AvailableSlotsProps) {
  const theme = useTheme();

  return (
    <SlotsContainer>
      <Typography variant="h6" mb={2}>
        Available hours for {dayjs(date).format("D MMMM")}:
      </Typography>
      {slots?.map((s) => {
        const isSelected =
          selectedTimeSlot && selectedTimeSlot.isSame(dayjs(s.startDate), "minute");

        return (
          <SlotBox key={dayjs(s.startDate).format("HH:mm")} isSlotSelected={isSelected}>
            <SlotTimeText>
              {dayjs(s.startDate).format("HH:mm")} - {dayjs(s.endDate).format("HH:mm")}
            </SlotTimeText>

            <Button
              variant="contained"
              color="primary"
              onClick={() => changeSelectedTimeSlot(dayjs(s.startDate))}
              sx={{ bgcolor: isSelected ? theme.palette.primary.light : "primary" }}
            >
              {isSelected ? "Chosen" : "Choose"}
            </Button>
          </SlotBox>
        );
      })}

      {slots?.length === 0 && <Typography>No slots for that day!</Typography>}
    </SlotsContainer>
  );
}

export default AvailableSlots;
