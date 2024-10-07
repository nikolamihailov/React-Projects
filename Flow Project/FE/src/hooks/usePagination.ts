import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = (initialPage: number = 0, initialItemsPerPage: number = 6) => {
  const [page, setPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value - 1);
      setSearchParams({ page: String(value - 1), items: String(itemsPerPage) });
      window.scrollTo(0, 0);
    },
    [itemsPerPage, setSearchParams]
  );

  const handleItemsPerPageChange = useCallback(
    (value: number) => {
      setItemsPerPage(value);
      setPage(0);
      setSearchParams({ page: "0", items: String(value) });
    },
    [setSearchParams]
  );

  const resetPage = useCallback(() => {
    setPage(0);
    setSearchParams({ page: "0", items: String(itemsPerPage) });
  }, [itemsPerPage, setSearchParams]);

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") ?? "0");
    const itemsPerPageFromParams = parseInt(
      searchParams.get("items") ?? String(initialItemsPerPage)
    );

    setPage(pageFromParams);
    setItemsPerPage(itemsPerPageFromParams);
  }, [searchParams, initialItemsPerPage, initialPage]);

  return {
    page,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    resetPage,
  };
};
