import { AnimatePresence, motion } from "framer-motion";
import styles from "./AdminListPage.module.css";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../../Pagination/Pagination";

// Shared frame for every admin list: a toolbar on top, a scrolling item area
// in the middle and pagination pinned to the bottom, so nothing gets pushed
// off screen however many items a page holds.
const AdminListPage = ({
  title,
  actions,
  filters,
  isLoading,
  isEmpty,
  emptyText = "Nothing here yet",
  layout = "grid",
  minItemWidth = 220,
  pagination,
  overlays,
  children,
}) => {
  const showPagination = pagination && pagination.pageCount > 1;

  return (
    <section className={styles["admin-list-page"]}>
      <header className={styles["header"]}>
        <h1>{title}</h1>
        {(actions || filters) && (
          <div className={styles["toolbar"]}>
            <div className={styles["actions"]}>{actions}</div>
            <div className={styles["filters"]}>{filters}</div>
          </div>
        )}
      </header>

      <div className={styles["body"]}>
        {isLoading ? (
          <div className={styles["center"]}>
            <Spinner />
          </div>
        ) : isEmpty ? (
          <p className={styles["empty"]}>{emptyText}</p>
        ) : (
          <motion.div
            layout
            className={styles[layout === "list" ? "list" : "grid"]}
            style={{ "--min-item-width": `${minItemWidth}px` }}
          >
            <AnimatePresence>{children}</AnimatePresence>
          </motion.div>
        )}
      </div>

      {showPagination && (
        <footer className={styles["footer"]}>
          <Pagination {...pagination} compact />
        </footer>
      )}

      {/* Modals are positioned against this section, as before. */}
      {overlays}
    </section>
  );
};

// Primary toolbar button, e.g. "Add product".
export const AdminActionButton = ({ children, ...props }) => (
  <button type="button" className={styles["action-button"]} {...props}>
    {children}
  </button>
);

// Labelled select used for every admin filter.
export const AdminFilterSelect = ({ label, id, children, ...props }) => (
  <label className={styles["filter"]} htmlFor={id}>
    <span>{label}</span>
    <select id={id} {...props}>
      {children}
    </select>
  </label>
);

export default AdminListPage;
