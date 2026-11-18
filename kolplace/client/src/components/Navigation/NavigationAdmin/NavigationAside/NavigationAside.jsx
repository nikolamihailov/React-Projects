import AdminInfo from "../AdminInfo/AdminInfo";
import SideMenu from "../SideMenu/SideMenu";
import styles from "./NavigationAside.module.css";

const NavigationAside = () => {
  return (
    <aside className={styles["aside"]}>
      <div className={styles["admin-info"]}>
        <AdminInfo />
      </div>
      <div className={styles["side-menu"]}>
        <SideMenu />
      </div>
    </aside>
  );
};

export default NavigationAside;
