import { NavLink } from "react-router-dom";
import Logo from "./Logo/Logo";
import logo from "/logo.png";
import styles from "./Navigation.module.css";

function UnauthenticatedNav() {
  return (
    <>
      <li>
        <NavLink to="/#about">About us</NavLink>
      </li>
      <li>
        <NavLink to="/#contact">Contact</NavLink>
      </li>
      <li>
        <NavLink to={"/"}>
          <Logo src={logo} width={60} />
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className={({ isActive }) => (isActive ? styles["active"] : "")}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" className={({ isActive }) => (isActive ? styles["active"] : "")}>
          Register
        </NavLink>
      </li>
    </>
  );
}

export default UnauthenticatedNav;
