import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav/MobileNav";
import AuthenticatedNav from "./AuthenticatedNav";
import UnauthenticatedNav from "./UnAuthenticatedNav";
import styles from "./Navigation.module.css";

function Navigation() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <>
      <Box component="nav" sx={{ padding: 1.5, bgcolor: theme.palette.primary.main }}>
        {isMdUp && (
          <ul className={styles["main-nav"]}>
            {isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />}
          </ul>
        )}
        {!isMdUp && <MobileNav />}
      </Box>
    </>
  );
}

export default Navigation;
