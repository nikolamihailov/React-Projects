import DropDownUser from "./DropdownUser/DropDownUser";
import styles from "../Icons.module.css";
import useDropdown from "../../../../hooks/useDropdown";

const UserIconDropDown = () => {
  const { isOpen, mouseEnter, mouseLeave } = useDropdown();

  return (
    <div
      className={styles["dropdown-container"]}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <button
        className={styles["icon-btn"]}
        title="User Profile"
      >
        <i className="fa-regular fa-user"></i>
        <i className="fa-regular fa-circle-check"></i>
      </button>
      {isOpen && <DropDownUser />}
    </div>
  );
};
export default UserIconDropDown;
