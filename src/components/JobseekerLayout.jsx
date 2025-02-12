import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

import { UserContext } from "../App";
import logo from "../../public/logo.png";
import UserLoggedinChip from "./UserLoggedinChip";

const drawerWidth = 240;

export default function JobseekerLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed Stored User:", parsedUser);

        const { token, userData } = parsedUser; // Fix: Extract userData instead of employer

        console.log("Stored Token:", token);
        console.log("Stored User Data:", userData);

        if (token && userData) {
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          alert("Invalid user data in localStorage");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        alert("Error reading user data. Please login again.");
        navigate("/login");
      }
    } else {
      alert("No user data found in localStorage");
      navigate("/login");
    }
    setLoading(false);
  }, [navigate, setUser, setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  const menuItems = [
    // { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Jobs Applied", icon: <WorkIcon />, path: "/dashboard" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
  ];

  const userMenuItems = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Applicants", path: "/applicants" },
    { text: "Meetings", path: "/meetings" },
    { text: "Settings", path: "/settings" },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Logo"
          style={{
            maxWidth: "150px",
            margin: "0 auto",
            display: "block",
            cursor: "pointer",
          }}
        />
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {menuItems.find((item) => item.path === location.pathname)?.text}
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", ml: "auto", gap: 2 }}
          >
            {user ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "20px",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onClick={() => navigate("/landing")}
                >
                  Home
                </p>
                <p
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onClick={() => navigate("/search")}
                >
                  Find Jobs
                </p>
                <p
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { color: "#38bff0" },
                  }}
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </p>
                <UserLoggedinChip user={user} handleLogout={handleLogout} />
              </div>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // Ensures content fits within available space
          ml: { sm: `${drawerWidth}px` }, // Prevents overlapping with sidebar
          pt: "80px", // Adds padding instead of margin
          maxWidth: "1200px", // Restricts max width for all pages
          margin: "auto", // Centers the content
        }}
      >
        {children}
      </Box>
    </>
  );
}
