import { useState, useEffect } from "react";
import "./App.css";
import TopNav from "./components/Navigation/TopNavigation/TopNav";
import ThemeButton from "./components/ThemeTogller/ThemeButton";

function App() {
  const [theme, setTheme] = useState("light");

  // dynamically set page title
  useEffect(() => {
    document.title = "KolPlace - Your Online Shop";
  }, []);

  // change app theme class on theme on btn click
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <div className={`app-${theme}`}>
      <ThemeButton
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <TopNav />
    </div>
  );
}

export default App;
