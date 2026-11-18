import AdminInfo from "../AdminInfo/AdminInfo";
import SideMenu from "../SideMenu/SideMenu";
import styles from "./NavigationAside.module.css";

const NavigationAside = ({ isOpen = false, onClose }) => {
  return (
    <>
      {isOpen && <div className={styles["scrim"]} onClick={onClose} aria-hidden="true"></div>}
      <aside id="admin-side-menu" className={`${styles["aside"]} ${isOpen ? styles["open"] : ""}`}>
        <div className={styles["admin-info"]}>
          <AdminInfo />
        </div>
        <div className={styles["side-menu"]}>
          <SideMenu />
        </div>
      </aside>
    </>
  );
};

export default NavigationAside;
