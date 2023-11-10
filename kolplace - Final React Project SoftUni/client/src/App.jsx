import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./contexts/themeContext.js";
import changeTheme from "./assets/js/theme.js";
import Header from "./components/Header/Header";
import Login from "./components/Auth/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Auth/Register/Register.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("");
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
