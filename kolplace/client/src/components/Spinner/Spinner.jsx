import styles from "./Spinner.module.css";

const Spinner = () => {
  return <span className={styles["loader"]} data-testid="spinner"></span>;
};
export default Spinner;
