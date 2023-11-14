import styles from "./AdminInfo.module.css";

const AdminInfo = () => {
  return (
    <div className={styles["info"]}>
      <img src="src/assets/avatar.png" alt="" />
      <p>Kolo Kolev</p>
      <p>Role: Admin</p>
    </div>
  );
};
export default AdminInfo;
