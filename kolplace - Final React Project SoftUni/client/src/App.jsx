import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import changeTheme from "./assets/js/theme.js";
import Header from "./components/Header/Header";
import Login from "./components/Auth/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Auth/Register/Register.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";
import { ThemeContext } from "./contexts/themeContext.js";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import AdminPanel from "./components/Admin/Admin.jsx";
import { NotifProvider } from "./contexts/NotificationContext.jsx";
import NotificationContainer from "./components/Notifications/NotificationContianer/NotificationContainer.jsx";
import About from "./components/About/About.jsx";
import OurStores from "./components/OurStores/OurStores.jsx";

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
    <AuthProvider>
      <ThemeContext.Provider value={values}>
        <NotifProvider>
          <div className={`app ${theme}`}>
            <Header />
            <main className="main">
              <NotificationContainer />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/admin-panel" element={<AdminPanel />}></Route>
                <Route path="/about-us" element={<About />}></Route>
                <Route path="/our-stores" element={<OurStores />}></Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </NotifProvider>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}

export default App;
