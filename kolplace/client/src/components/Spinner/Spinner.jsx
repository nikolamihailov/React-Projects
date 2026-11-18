import styles from "./Spinner.module.css";

// Loading indicator that sits where the content will appear.
// By default it fills the screen below the header, so a page that is still
// loading never shows its footer; `inline` is for popups and panels.
const Spinner = ({ inline = false }) => (
  <div className={`${styles["wrap"]} ${inline ? styles["inline"] : ""}`} role="status" aria-label="Loading">
    <span className={styles["loader"]} data-testid="spinner"></span>
  </div>
);

export default Spinner;
