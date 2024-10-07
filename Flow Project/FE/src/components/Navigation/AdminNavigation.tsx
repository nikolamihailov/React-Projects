import { Box } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { NavLink } from "react-router-dom";
import MobileNavAdmin from "./MobileNav/MobileNavAdmin";
import Logo from "./Logo/Logo";
import logo from "/logo.png";
import styles from "./Navigation.module.css";

function AdminNavigation() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box component="nav" sx={{ padding: 1.5, bgcolor: theme.palette.primary.main }}>
        {isMdUp && (
          <ul className={styles["admin-nav"]}>
            <Box>
              <li>
                <NavLink to={"/home"}>
                  <Logo src={logo} width={60} />
                </NavLink>
              </li>
            </Box>
            <Box sx={{ display: "flex", gap: "3.2rem" }}>
              <li>
                <NavLink
                  to="/admin-panel/services"
                  className={({ isActive }) => (isActive ? styles["active"] : "")}
                >
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin-panel/users"
                  className={({ isActive }) => (isActive ? styles["active"] : "")}
                >
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-panel/appointments"
                  className={({ isActive }) => (isActive ? styles["active"] : "")}
                >
                  Appointments
                </NavLink>
              </li>
            </Box>
          </ul>
        )}
        {!isMdUp && <MobileNavAdmin />}
      </Box>
    </>
  );
}

export default AdminNavigation;
