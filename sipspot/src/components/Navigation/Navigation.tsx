import Logo from "../UI/Logo/Logo";
import Nav from "../UI/Nav/Nav";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <Nav bgColor="#ffe066">
      <ul className={styles["main-nav"]}>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Recipes</a>
        </li>
        <Logo />
        <li>
          <a href="#">About us</a>
        </li>
        <li>
          <a href="#">Gallery</a>
        </li>
      </ul>
    </Nav>
  );
}

export default Navigation;
