import styles from "./Pagination.module.css";

const Pagination = ({ page, pageCount, prevPage, nextPage, switchToPage }) => {
  const pages = Array.from({ length: pageCount }, (_, idx) => idx + 1);
  return (
    <div className={styles["pagination"]}>
      <button disabled={page === 1} onClick={prevPage} title={"Previous Page"}>
        <i className="fa-solid fa-angles-left"></i>
      </button>
      {pages.map((p) => {
        return (
          <button
            key={p}
            onClick={() => switchToPage(p)}
            className={page === p && styles["page-active"]}
            title={`Page: ${p}`}
          >
            {p}
          </button>
        );
      })}
      <button
        disabled={page === pageCount}
        onClick={nextPage}
        title={"Next Page"}
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
