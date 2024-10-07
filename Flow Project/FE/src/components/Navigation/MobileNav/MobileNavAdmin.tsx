import { useCallback, useState } from "react";
import { Box, Drawer, IconButton, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "/logo.png";
import styles from "./MobileNav.module.css";

function MobileNavAdmin() {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <NavLink to={"/home"}>
        <Logo src={logo} width={60} />
      </NavLink>
      <IconButton onClick={() => setOpen(true)} sx={{ color: theme.palette.secondary.main }}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}>
            <IconButton onClick={handleCloseDrawer}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <ul className={styles["mobile-nav"]}>
            <li>
              <NavLink
                to="/admin-panel/services"
                className={({ isActive }) => (isActive ? styles["active"] : "")}
                onClick={handleCloseDrawer}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-panel/users"
                className={({ isActive }) => (isActive ? styles["active"] : "")}
                onClick={handleCloseDrawer}
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-panel/appointments"
                className={({ isActive }) => (isActive ? styles["active"] : "")}
                onClick={handleCloseDrawer}
              >
                Appointments
              </NavLink>
            </li>
          </ul>
        </Box>
      </Drawer>
    </Box>
  );
}

export default MobileNavAdmin;
