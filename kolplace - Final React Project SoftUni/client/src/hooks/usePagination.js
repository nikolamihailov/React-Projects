import { useCallback, useState } from "react";

const usePagination = () => {
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const nextPage = useCallback(() =>
        setPage((p) => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            if (p === pageCount) return p;
            return (p += 1);
        }), [pageCount]);

    const prevPage = useCallback(() =>
        setPage((p) => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            if (p === 1) return p;
            return (p -= 1);
        }), []);

    const switchToPage = useCallback((page) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setPage(page);
    }, []);

    const updatePageCount = useCallback((pC) => setPageCount(pC), []);

    const resetPage = useCallback(() => setPage(1), []);

    return {
        page, pageCount, nextPage, prevPage, updatePageCount, switchToPage, resetPage
    };
};

export default usePagination;