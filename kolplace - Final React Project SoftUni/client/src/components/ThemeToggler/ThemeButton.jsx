import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import styles from "./ThemeButton.module.css";

const ThemeButton = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <button
      className={styles["theme-btn"]}
      onClick={toggleTheme}
      title={`${theme === "dark" ? "Dark" : "White"} Theme`}
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
