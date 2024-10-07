import { useCallback, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Box, Button, Drawer, IconButton, useTheme } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "/logo.png";
import styles from "./MobileNav.module.css";
import { logoutBtnSX } from "../../../utils/StylesHelper/LogoutBtn";
import { RoleTypes } from "../../../types/Role";

function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);
  const { isAuthenticated, logoutUser, user } = useAuth();
  const theme = useTheme();
  const navigateTo = useNavigate();

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    logoutUser();
    handleCloseDrawer();
    navigateTo("/");
  }, [logoutUser, handleCloseDrawer, navigateTo]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <NavLink to={isAuthenticated ? "/home" : "/"}>
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
              <NavLink to="/#about" onClick={handleCloseDrawer}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/#contact" onClick={handleCloseDrawer}>
                Contact
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to={"/services"}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                    onClick={handleCloseDrawer}
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  {user?.role === RoleTypes.Admin && (
                    <NavLink to={"/admin-panel"} onClick={handleCloseDrawer}>
                      Admin Panel
                    </NavLink>
                  )}
                  {user?.role !== RoleTypes.Admin && (
                    <NavLink
                      to={"/appointments"}
                      className={({ isActive }) => (isActive ? styles["active"] : "")}
                      onClick={handleCloseDrawer}
                    >
                      Appointments
                    </NavLink>
                  )}
                </li>
                <li>
                  <NavLink
                    to={"/profile"}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                    onClick={handleCloseDrawer}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <Button onClick={handleLogout} color="primary" sx={logoutBtnSX}>
                    Logout
                  </Button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    onClick={handleCloseDrawer}
                    className={({ isActive }) => (isActive ? styles["active"] : "")}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </Box>
      </Drawer>
    </Box>
  );
}

export default MobileNav;
