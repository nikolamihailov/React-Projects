import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Auth/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import Register from "./components/Auth/Register/Register.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { NotifProvider } from "./contexts/NotificationContext.jsx";
import NotificationContainer from "./components/Notifications/NotificationContainer/NotificationContainer.jsx";
import About from "./components/About/About.jsx";
import OurStores from "./components/OurStores/OurStores.jsx";
import Categories from "./components/Admin/Categories/Categories.jsx";
import Products from "./components/Admin/Products/Products.jsx";
import Users from "./components/Admin/Users/Users.jsx";
import Stores from "./components/Admin/Stores/Stores.jsx";
import RouteGuardAdmin from "./guards/RouteGuardAdmin.jsx";
import { ThemeProvider } from "./contexts/themeContext.jsx";

function App() {
  return (
    <AuthProvider>
      <NotifProvider>
        <ThemeProvider>
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
        </ThemeProvider>
      </NotifProvider>
    </AuthProvider>
  );
}

export default App;
