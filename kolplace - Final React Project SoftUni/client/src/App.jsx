import { Routes, Route, Navigate } from "react-router-dom";
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
import Category from "./components/Category/Category.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Promotions from "./components/Promotions/Promotions.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext.jsx";
import { FavouriteProductsProvider } from "./contexts/FavouriteProductsContext.jsx";
import FavouriteProducts from "./components/FavouriteProducts/FavouriteProducts.jsx";
import UserProfile from "./components/Profile/UserProfile.jsx";
import ScrollToTop from "./components/Navigation/ScrollToTop/ScrollToTop.jsx";
import SearchedProducts from "./components/SearchedProducts/SearchedProducts.jsx";
import Reviews from "./components/Admin/Reviews/Reviews.jsx";

function App() {
  return (
    <NotifProvider>
      <AuthProvider>
        <ShoppingCartProvider>
          <FavouriteProductsProvider>
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
                  <Route
                    path="/favourite-products"
                    element={<FavouriteProducts />}
                  ></Route>
                  <Route path="/my-profile" element={<UserProfile />}></Route>
                  <Route
                    path="/categories/:name"
                    element={<Category />}
                  ></Route>
                  <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                  ></Route>
                  <Route
                    path="/products/search/*"
                    element={<SearchedProducts />}
                  ></Route>
                  <Route path="/promotions" element={<Promotions />}></Route>
                  <Route path="/admin-panel" element={<RouteGuardAdmin />}>
                    <Route path="categories" element={<Categories />}></Route>
                    <Route path="products" element={<Products />}></Route>
                    <Route path="users" element={<Users />}></Route>
                    <Route path="stores" element={<Stores />}></Route>
                    <Route path="reviews" element={<Reviews />}></Route>
                  </Route>
                  <Route path="/*" element={<Navigate to="/error" />} />
                  <Route path="/error" element={<ErrorPage />} />
                </Routes>
                <ScrollToTop />
              </main>
              <Footer />
            </ThemeProvider>
          </FavouriteProductsProvider>
        </ShoppingCartProvider>
      </AuthProvider>
    </NotifProvider>
  );
}

export default App;
