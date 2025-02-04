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
  CircularProgress
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon
} from "@mui/icons-material";
import { UserContext } from "../App";
import logo from "../../public/logo.png";

const drawerWidth = 240;

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      const { token, employer } = JSON.parse(storedUser);
      if (token && employer) {
        setUser(employer);
        setIsLoggedIn(true);
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [navigate, setUser, setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Applicants", icon: <PeopleIcon />, path: "/applicants" },
    { text: "Meetings", icon: <EventIcon />, path: "/meetings" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" }
  ];

  const userMenuItems = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Applicants", path: "/applicants" },
    { text: "Meetings", path: "/meetings" },
    { text: "Settings", path: "/settings" }
  ];

  const drawer = (
    <div>
      <Toolbar>
        <img
          src={logo}
          alt="Logo"
          style={{ maxWidth: "150px", margin: "0 auto", display: "block" }}
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
          height: "100vh"
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
          color: "black"
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
                onMouseLeave={() => setAnchorEl(null)}
              >
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <AccountCircleIcon sx={{ fontSize: 32, color: "#1976d2" }} />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{ ml: 1, fontWeight: "bold", color: "#1976d2" }}
                >
                  {user.fname} {user.lname}
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{ sx: { maxWidth: 180, mt: 1.5 } }}
                >
                  {userMenuItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      onClick={() => navigate(item.path)}
                    >
                      {item.text}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/post-job")}
            >
              Post Job
            </Button>
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
              width: drawerWidth
            }
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
              width: drawerWidth
            }
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
          margin: "auto" // Centers the content
        }}
      >
        {children}
      </Box>
    </>
  );
}
