import styles from "./Pagination.module.css";

const Pagination = ({ page, pageCount, prevPage, nextPage }) => {
  return (
    <div className={styles["pagination"]}>
      <button disabled={page === 1} onClick={prevPage}>
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <p>{page}</p>
      <button disabled={page === pageCount} onClick={nextPage}>
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
