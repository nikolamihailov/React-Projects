import { useState, useEffect } from "react";
import changeTheme from "./assets/js/theme.js";
import Header from "./components/Header/Header";
import { ThemeContext } from "./contexts/themeContext.js";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("");
  // dynamically set page title
  useEffect(() => {
    document.title = "KolPlace - Your Online Shop";
    setTheme(changeTheme());
  }, []);

  // change app theme class on theme on btn click
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const values = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={values}>
      <div className={`app ${theme}`}>
        <Header />
        <main className="main"></main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
