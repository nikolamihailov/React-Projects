import styles from "./ThemeButton.module.css";

const ThemeButton = ({ toggleTheme, theme }) => {
  return (
    <button
      className={styles["theme-btn"]}
      onClick={toggleTheme}
      title="White/Dark Theme"
    >
      <i
        className={`fa-regular fa-${
          theme === "dark" ? "moon" : "sun"
        }`}
      ></i>
    </button>
  );
};

export default ThemeButton;
