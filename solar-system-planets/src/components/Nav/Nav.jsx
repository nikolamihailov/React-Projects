import styles from "./nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <img src="/lg.png" alt="logo" />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
