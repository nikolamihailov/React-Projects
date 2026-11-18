import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./AdminListPage.module.css";
import Spinner from "../../Spinner/Spinner";
import Pagination from "../../Pagination/Pagination";

// Sizes are in rem so the grid scales with the user's font size setting.
const GAP = { grid: 1.25, list: 0.75 };
// Phones: narrower cards so two fit side by side, and at least this many rows
// per page (the list scrolls) so a page is never just one or two items.
const COMPACT_WIDTH = 37.5;
const COMPACT_MIN_ITEM_WIDTH = 9.4;
const COMPACT_MIN_ROWS = 3;

const rootFontSize = () =>
  parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

// Shared frame for every admin list: a toolbar on top, a scrolling item area
// in the middle and pagination pinned to the bottom, so nothing gets pushed
// off screen however many items a page holds.
//
// With onPageSizeChange, the page is told how many items fill the visible area
// with complete rows: columns come from the width, rows from the height of the
// rendered cards. Until a card has been measured, `rows` is used.
const AdminListPage = ({
  title,
  actions,
  filters,
  isLoading,
  isEmpty,
  emptyText = "Nothing here yet",
  layout = "grid",
  minItemWidth = 13.8, // rem
  rows = 2,
  onPageSizeChange,
  pagination,
  overlays,
  children,
}) => {
  const bodyRef = useRef(null);
  const itemsRef = useRef(null);
  const [itemHeight, setItemHeight] = useState(null);
  const [isCompact, setIsCompact] = useState(false);
  const showPagination = pagination && pagination.pageCount > 1;
  const gap = GAP[layout] ?? GAP.grid;
  const itemWidth = isCompact ? Math.min(minItemWidth, COMPACT_MIN_ITEM_WIDTH) : minItemWidth;

  // Tallest rendered item; the grid stretches every row to it.
  useLayoutEffect(() => {
    const items = itemsRef.current?.children;
    if (!items?.length) return;
    const tallest = Math.max(...Array.from(items, (el) => el.offsetHeight));
    setItemHeight((prev) => (prev && Math.abs(prev - tallest) < 4 ? prev : tallest));
  }, [children, isLoading]);

  useEffect(() => {
    if (!bodyRef.current) return;
    let last = null;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const rem = rootFontSize();
      const compact = width < COMPACT_WIDTH * rem;
      setIsCompact(compact);
      if (!onPageSizeChange) return;
      const minWidth = (compact ? Math.min(minItemWidth, COMPACT_MIN_ITEM_WIDTH) : minItemWidth) * rem;
      const gapPx = gap * rem;
      // Same maths as the CSS grid: repeat(auto-fill, minmax(minItemWidth, 1fr)).
      const columns = layout === "list"
        ? 1
        : Math.max(1, Math.floor((width + gapPx) / (minWidth + gapPx)));
      let fittingRows = itemHeight
        ? Math.max(1, Math.floor((height + gapPx) / (itemHeight + gapPx)))
        : rows;
      if (compact) fittingRows = Math.max(fittingRows, COMPACT_MIN_ROWS);
      const size = columns * fittingRows;
      if (size !== last) {
        last = size;
        onPageSizeChange(size);
      }
    });
    observer.observe(bodyRef.current);
    return () => observer.disconnect();
  }, [onPageSizeChange, layout, minItemWidth, rows, gap, itemHeight]);

  return (
    <section className={styles["admin-list-page"]} aria-label={title}>
      {/* The side menu already shows where you are, so the title is for screen readers only. */}
      <h1 className={styles["visually-hidden"]}>{title}</h1>

      {(actions || filters) && (
        <div className={styles["toolbar"]}>
          <div className={styles["filters"]}>{filters}</div>
          <div className={styles["actions"]}>{actions}</div>
        </div>
      )}

      <div className={styles["body"]} ref={bodyRef}>
        {isLoading ? (
          <div className={styles["center"]}>
            <Spinner />
          </div>
        ) : isEmpty ? (
          <p className={styles["empty"]}>{emptyText}</p>
        ) : (
          <motion.div
            layout
            ref={itemsRef}
            className={`${styles[layout === "list" ? "list" : "grid"]} ${isCompact ? styles["compact"] : ""}`}
            style={{ "--min-item-width": `${itemWidth}rem`, "--grid-gap": `${gap}rem` }}
          >
            <AnimatePresence>{children}</AnimatePresence>
          </motion.div>
        )}
      </div>

      {showPagination && (
        <div className={styles["footer"]}>
          <Pagination {...pagination} compact />
        </div>
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


export default AdminListPage;
