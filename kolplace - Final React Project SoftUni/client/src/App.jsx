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
import { NotifProvider } from "./contexts/NotificationContext.jsx";
import NotificationContainer from "./components/Notifications/NotificationContianer/NotificationContainer.jsx";
import About from "./components/About/About.jsx";
import OurStores from "./components/OurStores/OurStores.jsx";
import Categories from "./components/Admin/Categories/Categories.jsx";
import Products from "./components/Admin/Products/Products.jsx";
import Users from "./components/Admin/Users/Users.jsx";
import Stores from "./components/Admin/Stores/Stores.jsx";
import RouteGuardAdmin from "./guards/RouteGuardAdmin.jsx";

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
                <Route path="/about-us" element={<About />}></Route>
                <Route path="/our-stores" element={<OurStores />}></Route>
                <Route path="/admin-panel" element={<RouteGuardAdmin />}>
                  <Route path="categories" element={<Categories />}></Route>
                  <Route path="products" element={<Products />}></Route>
                  <Route path="users" element={<Users />}></Route>
                  <Route path="stores" element={<Stores />}></Route>
                </Route>
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
