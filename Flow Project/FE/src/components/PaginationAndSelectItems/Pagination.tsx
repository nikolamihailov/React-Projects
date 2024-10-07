import React from "react";
import { Pagination as MUIPagination } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { pagesSx } from "../../utils/StylesHelper/Pagination";

type PaginationProps = {
  totalPages: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

function Pagination({ totalPages, page, onPageChange }: PaginationProps) {
  const theme = useTheme();

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(event, value);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {totalPages > 1 && (
        <MUIPagination
          count={totalPages}
          page={page + 1}
          onChange={handlePageChange}
          shape="rounded"
          sx={pagesSx(theme)}
        />
      )}
    </>
  );
}

export default Pagination;
