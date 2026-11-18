import { Link } from "react-router-dom";
import DropdownItem from "./DropdownItem/DropdownItem";
import styles from "./DropdownSearch.module.css";

export const MAX_RESULTS = 5;

const DropdownSearch = ({
  products = [],
  search,
  isLoading,
  activeIndex,
  onHover,
  onClose,
  resultsUrl,
}) => {
  const term = search.trim();
  if (term === "") return null;

  const visible = products.slice(0, MAX_RESULTS);
  const hasResults = visible.length > 0;
  const seeAllIndex = visible.length;

  return (
    <>
      <div className="backdrop-search" onClick={onClose}></div>
      <div className={styles["panel"]}>
        {hasResults ? (
          <>
            <ul
              id="search-results"
              role="listbox"
              aria-label="Search suggestions"
              className={`${styles["list"]} ${isLoading ? styles["is-stale"] : ""}`}
            >
              {visible.map((p, i) => (
                <DropdownItem
                  key={p._id}
                  {...p}
                  id={`search-option-${i}`}
                  isActive={activeIndex === i}
                  onHover={() => onHover(i)}
                  search={term}
                  onClose={onClose}
                />
              ))}
            </ul>
            <Link
              to={resultsUrl}
              id={`search-option-${seeAllIndex}`}
              className={`${styles["see-all"]} ${
                activeIndex === seeAllIndex ? styles["active"] : ""
              }`}
              onMouseEnter={() => onHover(seeAllIndex)}
              onClick={onClose}
            >
              <span>
                See all results for <strong>&ldquo;{term}&rdquo;</strong>
              </span>
              <span className={styles["count"]}>
                {products.length}
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
            </Link>
          </>
        ) : isLoading ? (
          <div id="search-results" className={styles["status"]} role="status">
            <span className={styles["spinner"]} aria-hidden="true"></span>
            Searching&hellip;
          </div>
        ) : (
          <div id="search-results" className={styles["empty"]} role="status">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <p className={styles["empty-title"]}>
              No results for &ldquo;{term}&rdquo;
            </p>
            <p className={styles["empty-text"]}>
              Check the spelling or try a shorter search.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownSearch;
