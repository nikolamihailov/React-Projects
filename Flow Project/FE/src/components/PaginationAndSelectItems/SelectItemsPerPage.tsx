import { Box, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { selectSx } from "../../utils/StylesHelper/Pagination";

type SelectProps = {
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  itemName: string;
  selectOptionsNumbers?: number[];
};

function SelectItemsPerPage({
  itemsPerPage,
  onItemsPerPageChange,
  itemName,
  selectOptionsNumbers = [6, 12, 18, 24],
}: SelectProps) {
  const theme = useTheme();

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const selectedValue = Number(event.target.value);
    onItemsPerPageChange(selectedValue);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "3.2rem", alignItems: "center" }}>
        <Typography variant="body2" sx={{ fontSize: "2rem" }}>
          {itemName} per page:
        </Typography>
        <Select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          displayEmpty
          inputProps={{ "aria-label": `${itemName} per page` }}
          sx={selectSx(theme)}
        >
          {selectOptionsNumbers.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
}

export default SelectItemsPerPage;
