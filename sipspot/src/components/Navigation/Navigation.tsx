import { NavLink } from "react-router-dom";
import Logo from "../UI/Logo/Logo";
import Nav from "../UI/Nav/Nav";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <Nav bgColor="#ffe066">
      <ul className={styles["main-nav"]}>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/recipes"}>Recipes</NavLink>
        </li>
        <Logo />
        <li>
          <NavLink to={"/gallery"}>Gallery</NavLink>
        </li>
        <li>
          <NavLink to={"/about-us"}>About us</NavLink>
        </li>
      </ul>
    </Nav>
  );
}

export default Navigation;
