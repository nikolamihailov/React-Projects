import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../assets/logo.svg";
import { getAll } from "../../data/services/categoryService";

const SHOP_LINKS = [
  { to: "/promotions", label: "Promotions" },
  { to: "/about-us", label: "About us" },
  { to: "/our-stores", label: "Our stores" },
];

const ACCOUNT_LINKS = [
  { to: "/my-profile", label: "My profile" },
  { to: "/my-orders", label: "My orders" },
  { to: "/favourite-products", label: "Favourites" },
  { to: "/shopping-cart", label: "Shopping cart" },
];

const Footer = () => {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAll()
      .then((data) => Array.isArray(data) && setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className={styles["footer"]} data-testid="footer">
      <div className={styles["columns"]}>
        <div className={styles["brand"]}>
          <Link to="/" aria-label="KolPlace home">
            <img src={logo} alt="KolPlace" className={styles["logo"]} />
          </Link>
          <p>Your shopping place for games, tech, books and more.</p>
        </div>

        <nav aria-label="Shop">
          <h3>Shop</h3>
          <ul>
            {SHOP_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Account">
          <h3>Account</h3>
          <ul>
            {ACCOUNT_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {categories.length > 0 && (
          <nav aria-label="Categories">
            <h3>Categories</h3>
            <ul>
              {categories.slice(0, 8).map((c) => (
                <li key={c._id}>
                  <Link to={`/categories/${c.name.toLowerCase()}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className={styles["bottom"]}>
        <span>&copy; {new Date().getFullYear()} KolPlace. All rights reserved.</span>
        <span>
          Design by{" "}
          <a href="https://github.com/nikolamihailov/" target="_blank" rel="noreferrer">
            Nikola Mihaylov
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
