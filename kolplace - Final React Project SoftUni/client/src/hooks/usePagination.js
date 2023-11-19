import { useCallback, useState } from "react";

const usePagination = () => {
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const nextPage = useCallback(() =>
        setPage((p) => {
            if (p === pageCount) return p;
            return (p += 1);
        }), [pageCount]);

    const prevPage = useCallback(() =>
        setPage((p) => {
            if (p === 1) return p;
            return (p -= 1);
        }), []);

    const switchToPage = useCallback((page) => setPage(page), []);

    const updatePageCount = useCallback((pC) => setPageCount(pC), []);

    return {
        page, pageCount, nextPage, prevPage, updatePageCount, switchToPage
    };
};

export default usePagination;