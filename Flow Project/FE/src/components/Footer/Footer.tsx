import { useTheme } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import styles from "./Footer.module.css";

function Footer() {
  const theme = useTheme();

  return (
    <footer className={styles["footer"]}>
      <p>All rights reserved! &copy; {new Date().getFullYear()}</p>
      <div className={styles["socials"]}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Instagram sx={{ fontSize: 30, color: theme.palette.secondary.main }} />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Facebook sx={{ fontSize: 30, color: theme.palette.secondary.main }} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
