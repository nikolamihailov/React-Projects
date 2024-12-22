import SocialNetwork from "../Socials/SocialNetwork";
import styles from "./footer.module.css";
import { SocialNetworks, socials } from "./socials";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>All rights reserved! &copy; {new Date().getFullYear()}</p>
      <div className={styles["social-networks"]}>
        <ul>
          <SocialNetwork linkUrl={socials[SocialNetworks.linkedIn]} networkName={SocialNetworks.linkedIn} />
          <SocialNetwork linkUrl={socials[SocialNetworks.github]} networkName={SocialNetworks.github} />
          <SocialNetwork linkUrl={socials[SocialNetworks.instagram]} networkName={SocialNetworks.instagram} />
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
