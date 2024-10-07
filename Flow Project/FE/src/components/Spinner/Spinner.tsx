import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { spinnerSx } from "../../utils/StylesHelper/Spinner";

function Spinner() {
  const theme = useTheme();
  return (
    <Box sx={spinnerSx}>
      <CircularProgress sx={{ color: theme.palette.primary.main }} />
    </Box>
  );
}

export default Spinner;
