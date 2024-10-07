import { Fab, useScrollTrigger, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useCallback } from "react";

function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 350,
  });

  const handleClick = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        style={{
          position: "fixed",
          bottom: 120,
          right: 30,
        }}
      >
        <Fab color="primary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon fontSize="medium" />
        </Fab>
      </div>
    </Zoom>
  );
}

export default ScrollTop;
