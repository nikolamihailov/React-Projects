import styles from "../Icons.module.css";

const UserIconDropDown = () => {
  return (
    <>
      <button
        className={styles["icon-btn"]}
        title="User Profile"
      >
        <i className="fa-regular fa-user"></i>
      </button>
    </>
  );
};
export default UserIconDropDown;
