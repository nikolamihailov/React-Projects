import { useEffect, useId, useRef, useState } from "react";
import styles from "./ExpandableText.module.css";

// Long text collapsed to a few lines with a "Show more" toggle. The toggle
// only appears when the text is actually longer than the collapsed height.
const ExpandableText = ({ children, lines = 8, className = "" }) => {
  const ref = useRef(null);
  const id = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [children, lines]);

  return (
    <div className={className}>
      <p
        id={id}
        ref={ref}
        className={`${styles["text"]} ${isExpanded ? "" : styles["clamped"]}`}
        style={{ "--lines": lines }}
      >
        {children}
      </p>
      {(isOverflowing || isExpanded) && (
        <button
          type="button"
          className={styles["toggle"]}
          onClick={() => setIsExpanded((v) => !v)}
          aria-expanded={isExpanded}
          aria-controls={id}
        >
          {isExpanded ? "Show less" : "Show more"}
          <i className={`fa-solid fa-chevron-${isExpanded ? "up" : "down"}`} aria-hidden="true"></i>
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
