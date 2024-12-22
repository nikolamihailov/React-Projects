import AudioPlayer from "../AudioPlayer/AudioPlayer";
import styles from "./nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <img src="/lg.png" alt="logo" />
        </li>
      </ul>
      <AudioPlayer />
    </nav>
  );
};

export default Nav;
