import { NavLink } from "react-router-dom";
import Logo from "../UI/Logo/Logo";
import Nav from "../UI/Nav/Nav";
import logo from "/logo-icon.png";
import { Colors } from "../../../../types/Colors";

function Navigation() {
  return (
    <Nav bgColor={Colors.Tertiary}>
      <ul className="nav__main">
        <li className="nav__list-item">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to={"/recipes"}>Recipes</NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to={"/"}>
            <Logo src={logo} width={60} />
          </NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to={"/gallery"}>Gallery</NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to={"/about-us"}>About us</NavLink>
        </li>
      </ul>
    </Nav>
  );
}

export default Navigation;
