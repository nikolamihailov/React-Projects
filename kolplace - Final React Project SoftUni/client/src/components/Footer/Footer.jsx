import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <h3>All rights reserved! &copy; 2023</h3>
      <i>
        Design:
        <a
          href="https://github.com/nikolamihailov/"
          target="_blank"
          rel="noreferrer"
        >
          Nikola Mihaylov
        </a>
      </i>
    </footer>
  );
};

export default Footer;
