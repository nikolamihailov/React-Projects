import { Outlet, useLocation } from "react-router-dom";
import NavigationAside from "../Navigation/NavigationAdmin/NavigationAside/NavigationAside";
import TopNavAdmin from "../Navigation/NavigationAdmin/NavigationTop/TopNavAdmin";
import styles from "./Admin.module.css";
import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";

const AdminPanel = () => {
  useTitle("Admin Panel");
  const { pathname } = useLocation();
  // On narrow screens the side menu is a drawer opened from the top nav.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  return (
    <section className={styles["admin-panel-section"]}>
      <TopNavAdmin isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen((o) => !o)} />
      <div className={styles["content-container"]}>
        <NavigationAside isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        {pathname === "/admin-panel" ? (
          <div className={styles["admin-panel-info"]}>
            <h1>Welcome to Admin Panel!</h1>
            <p>
              Here you can manage categories, products, reviews, users and
              stores! You can also check store statistics. From the side menu
              you can choose what to manage. To go back to the website
              click the logo.
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </section>
  );
};

export default AdminPanel;
