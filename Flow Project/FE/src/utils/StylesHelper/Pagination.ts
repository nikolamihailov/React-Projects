import { SxProps, Theme } from "@mui/material";

export const pagesSx = (theme: Theme): SxProps => ({
  "& .MuiPaginationItem-root": {
    bgcolor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: "1.8rem",
    width: "4rem",
    height: "4rem",
    padding: "1.6rem",
  },
  "& .MuiPaginationItem-root:hover": {
    bgcolor: theme.palette.primary.dark,
  },
  "& .Mui-selected": {
    bgcolor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
  },
  "& .MuiPaginationItem-ellipsis": {
    color: theme.palette.secondary.main,
  },
});

export const selectSx = (theme: Theme) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  "& .MuiSelect-icon": {
    color: theme.palette.secondary.main,
  },
  "& .MuiMenuItem-root": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
});
