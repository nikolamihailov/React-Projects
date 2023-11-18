import DropDownUser from "./DropdownUser/DropDownUser";
import styles from "../Icons.module.css";
import { useShowHide } from "../../../../hooks/useShowHide";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

const UserIconDropDown = () => {
  const { isOpen, mouseEnter, mouseLeave } = useShowHide();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div
      className={styles["dropdown-container"]}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <button className={styles["icon-btn"]} title="User Profile">
        <i className="fa-regular fa-user"></i>
        {isAuthenticated && <i className="fa-regular fa-circle-check"></i>}
      </button>
      {isOpen && <DropDownUser mouseLeave={mouseLeave} />}
    </div>
  );
};
export default UserIconDropDown;
