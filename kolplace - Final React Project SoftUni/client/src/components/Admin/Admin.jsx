import { Outlet, useLocation } from "react-router-dom";
import NavigationAside from "../Navigation/NavigationAdmin/NavigationAside/NavigationAside";
import TopNavAdmin from "../Navigation/NavigationAdmin/NavigationTop/TopNavAdmin";
import styles from "./Admin.module.css";
import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";

const AdminPanel = () => {
  useTitle("Admin Panel");
  const [pageURL, setPageURL] = useState("/");
  const loc = useLocation();

  useEffect(() => {
    setPageURL(loc.pathname);
  }, [loc]);

  return (
    <section className={styles["admin-panel-section"]}>
      <TopNavAdmin />
      <div className={styles["content-container"]}>
        <NavigationAside />
        {pageURL === "/admin-panel" ? (
          <div className={styles["admin-panel-info"]}>
            <h1>Welcome to Admin Panel!</h1>
            <p>
              Here you can manage categories, products, reviews, users and
              stores!You can also check store statistics. From the navigation
              aside you can choose what to manage. To go back to the webiste
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
