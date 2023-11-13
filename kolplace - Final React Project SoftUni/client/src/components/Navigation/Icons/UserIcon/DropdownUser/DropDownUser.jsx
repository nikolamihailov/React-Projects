import { useContext } from "react";
import styles from "./Dropdown.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthContext";
const DropDownUser = () => {
  const { isAdmin, isAuthenticated } = useContext(AuthContext);
  return (
    <ul className={styles["user-dropdown"]}>
      {isAuthenticated ? (
        <>
          <Link to={"/my-profile"}>
            <li>
              <i className="fa-regular fa-user"></i>
              <span>My Profile</span>
            </li>
          </Link>

          <Link to={"/favourite-products"}>
            <li>
              <i className="fa-regular fa-heart"></i>
              <span>Favourite Products</span>
            </li>
          </Link>
          {isAdmin && (
            <Link to={"/admin"}>
              <li>
                <i className="fas fa-user-cog"></i>
                <span>Admin Panel</span>
              </li>
            </Link>
          )}
          <Link to={"/logout"}>
            <li>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </li>
          </Link>
        </>
      ) : (
        <>
          <Link to={"/login"}>
            <li>
              <i className="fa-solid fa-key"></i>
              <span>Login</span>
            </li>
          </Link>

          <Link to={"/register"}>
            <li>
              <i className="fa-solid fa-user-plus"></i>
              <span>Register</span>
            </li>
          </Link>
        </>
      )}
    </ul>
  );
};

export default DropDownUser;
