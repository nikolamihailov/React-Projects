import styles from "./ThemeButton.module.css";

const ThemeButton = ({ toggleTheme }) => {
  return (
    <button
      className={styles["theme-btn"]}
      onClick={toggleTheme}
    >
      Dark/white theme
    </button>
  );
};

export default ThemeButton;
