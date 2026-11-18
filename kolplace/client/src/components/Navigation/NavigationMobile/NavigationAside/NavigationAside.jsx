import { Link, NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";
import styles from "./NavigationAside.module.css";
import { getAll } from "../../../../data/services/categoryService";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import Logo from "../../Logo/Logo";

const LINKS = [
  { to: "/promotions", label: "Promotions", icon: "fa-tags" },
  { to: "/about-us", label: "About us", icon: "fa-circle-info" },
  { to: "/our-stores", label: "Our stores", icon: "fa-store" },
];

// Mobile side menu: a drawer from the left with the main links, the
// categories (expandable) and the theme switch.
const NavigationAside = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    getAll()
      .then((data) => Array.isArray(data) && setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    // Keep the page behind from scrolling while the drawer is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const linkClass = ({ isActive }) => `${styles["link"]} ${isActive ? styles["active"] : ""}`;

  return createPortal(
    <>
      <div className={styles["scrim"]} onClick={onClose} aria-hidden="true"></div>
      <aside className={styles["drawer"]} aria-label="Menu">
        <div className={styles["head"]}>
          <Link to="/" onClick={onClose} aria-label="KolPlace home">
            <Logo />
          </Link>
          <button type="button" className={styles["close"]} onClick={onClose} aria-label="Close menu" autoFocus>
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <nav className={styles["body"]}>
          <ul className={styles["links"]}>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} onClick={onClose} className={linkClass}>
                  <i className={`fa-solid ${l.icon}`} aria-hidden="true"></i>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                type="button"
                className={styles["link"]}
                onClick={() => setShowCategories((v) => !v)}
                aria-expanded={showCategories}
              >
                <i className="fa-solid fa-list" aria-hidden="true"></i>
                Categories
                <i
                  className={`fa-solid fa-chevron-${showCategories ? "up" : "down"} ${styles["chevron"]}`}
                  aria-hidden="true"
                ></i>
              </button>
              {showCategories && (
                <ul className={styles["categories"]}>
                  {categories.map((c) => (
                    <li key={c._id}>
                      <NavLink to={`/categories/${c.name.toLowerCase()}`} onClick={onClose} className={linkClass}>
                        <img src={c.categoryImage} alt="" />
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <div className={styles["foot"]}>
          <button type="button" className={styles["link"]} onClick={toggleTheme}>
            <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`} aria-hidden="true"></i>
            {theme === "dark" ? "Light theme" : "Dark theme"}
          </button>
        </div>
      </aside>
    </>,
    document.querySelector(".app") || document.body
  );
};

export default NavigationAside;
