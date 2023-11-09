import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import changeTheme from "./assets/js/theme.js";
import Header from "./components/Header/Header";
import { ThemeContext } from "./contexts/themeContext.js";
import "./App.css";
import Login from "./components/Auth/Login/Login.jsx";
import useTitle from "./hooks/useTitle.js";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Auth/Register/Register.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [theme, setTheme] = useState("");

  // dynamically set page title
  useTitle("KolPlace - Your Online Shop");
  useEffect(() => {
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
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/login"
              element={<Login />}
            ></Route>
            <Route
              path="/register"
              element={<Register />}
            ></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
