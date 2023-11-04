import { useState } from "react";
import DropDownUser from "../../DropdownUser/DropDownUser";
import styles from "../Icons.module.css";

const UserIconDropDown = () => {
  const [isDropdownOpen, setIsDropDownOpen] =
    useState(false);

  const handleMouseEnter = () => {
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropDownOpen(false);
  };
  return (
    <div
      className={styles["dropdown-container"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={styles["icon-btn"]}
        title="User Profile"
      >
        <i className="fa-regular fa-user"></i>
        <i className="fa-regular fa-circle-check"></i>
      </button>
      {isDropdownOpen && <DropDownUser />}
    </div>
  );
};
export default UserIconDropDown;
