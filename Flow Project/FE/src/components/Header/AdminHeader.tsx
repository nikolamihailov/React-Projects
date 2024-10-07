import AdminNavigation from "../Navigation/AdminNavigation";
import styles from "./Header.module.css";

function AdminHeader() {
  return (
    <header className={styles["header"]}>
      <AdminNavigation />
    </header>
  );
}

export default AdminHeader;
