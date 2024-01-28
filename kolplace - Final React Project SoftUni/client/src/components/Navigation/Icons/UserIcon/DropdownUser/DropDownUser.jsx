import { useCallback, useContext } from "react";
import styles from "./Dropdown.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { NotifContext } from "../../../../../contexts/NotificationContext";

const DropDownUser = ({ mouseLeave }) => {
  const { updateAuth, isAdmin, isAuthenticated, email } =
    useContext(AuthContext);
  const { updateNotifs } = useContext(NotifContext);

  const onLogout = useCallback(() => {
    updateNotifs([{ text: "You successfuly logged out!", type: "success" }]);
    updateAuth({});
    mouseLeave();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [updateAuth, updateNotifs, mouseLeave]);

  return (
    <>
      <ul className={styles["user-dropdown"]}>
        {isAuthenticated ? (
          <>
            <li>{email}</li>
            <Link to={"/my-profile"} onClick={mouseLeave}>
              <li>
                <i className="fa-solid fa-user"></i>
                <span>My Profile</span>
              </li>
            </Link>
            <Link to={"/my-orders"} onClick={mouseLeave}>
              <li>
                <i className="fas fa-truck"></i>
                <span>My Orders</span>
              </li>
            </Link>

            <Link to={"/favourite-products"} onClick={mouseLeave}>
              <li>
                <i className="fa-solid fa-heart"></i>
                <span>Favourite Products</span>
              </li>
            </Link>
            {isAdmin && (
              <Link to={"/admin-panel"} onClick={mouseLeave}>
                <li>
                  <i className="fas fa-user-cog"></i>
                  <span>Admin Panel</span>
                </li>
              </Link>
            )}
            <Link to={"/"} onClick={onLogout}>
              <li>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"} onClick={mouseLeave}>
              <li>
                <i className="fa-solid fa-key"></i>
                <span>Login</span>
              </li>
            </Link>

            <Link to={"/register"} onClick={mouseLeave}>
              <li>
                <i className="fa-solid fa-user-plus"></i>
                <span>Register</span>
              </li>
            </Link>
          </>
        )}
      </ul>
    </>
  );
};

export default DropDownUser;
