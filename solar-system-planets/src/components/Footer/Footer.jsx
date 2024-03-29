import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>All rights reserved! &copy; {new Date().getFullYear()}</p>
      <div className={styles["social-networks"]}>
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/nikola-mihaylov/"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/nikolamihailov" target="_blank">
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/nikolanm06/" target="_blank">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
