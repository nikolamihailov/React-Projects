import SocialNetwork from "../Socials/SocialNetwork";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>All rights reserved! &copy; {new Date().getFullYear()}</p>
      <div className={styles["social-networks"]}>
        <ul>
          <SocialNetwork linkUrl={"https://www.linkedin.com/in/nikola-mihaylov/"} networkName={"linkedin"} />
          <SocialNetwork linkUrl={"https://github.com/nikolamihailov"} networkName={"github"} />
          <SocialNetwork linkUrl={"https://www.instagram.com/nikolanm06/"} networkName={"instagram"} />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
