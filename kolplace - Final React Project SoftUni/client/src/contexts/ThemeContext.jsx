import { createContext, useEffect, useState } from "react";
import changeTheme from "../assets/js/theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    setTheme(changeTheme());
  }, []);

  // change app theme class on theme on btn click
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const themeValues = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={themeValues}>
      <div className={`app ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
