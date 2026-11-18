import styles from "./Pagination.module.css";

// Page numbers to show: always the first and last page plus the pages around
// the current one, with gaps ("…") in between, so the bar never overflows.
const visiblePages = (page, pageCount, around = 1) => {
  const pages = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= around) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "gap") {
      pages.push("gap");
    }
  }
  return pages;
};

const Pagination = ({ page, pageCount, prevPage, nextPage, switchToPage, compact = false }) => {
  const pages = visiblePages(page, pageCount);
  return (
    <nav
      className={`${styles["pagination"]} ${compact ? styles["compact"] : ""}`}
      aria-label="Pagination"
    >
      <button disabled={page === 1} onClick={prevPage} title={"Previous Page"}>
        <i className="fa-solid fa-angles-left"></i>
      </button>
      {pages.map((p, idx) =>
        p === "gap" ? (
          <span key={`gap-${idx}`} className={styles["gap"]}>
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => switchToPage(p)}
            className={page === p ? styles["page-active"] : ""}
            aria-current={page === p ? "page" : undefined}
            title={`Page: ${p}`}
          >
            {p}
          </button>
        )
      )}
      <button
        disabled={page === pageCount}
        onClick={nextPage}
        title={"Next Page"}
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </nav>
  );
};

export default Pagination;
