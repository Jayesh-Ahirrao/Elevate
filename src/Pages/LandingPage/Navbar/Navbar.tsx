import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../public/logo.png";
import { User } from "lucide-react";
import "./Navbar.css";
import { UserContext } from "../../../App";
import { Avatar, Chip, Tooltip } from "@mui/material";

const Navbar = () => {
  const { user, isLoggedIn, setIsLoggedIn, setUser } = useContext(UserContext);
  console.log("User value  ->>> " + user);
  console.log("Login value  ->> " + isLoggedIn);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("IsLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  // const capitalizeFirstLetter = (string) => {
  //   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  // };

  return (
    <nav className="navbar">
      <div onClick={() => navigate("/landing")} className="navbar-brand">
        <img src={logo} alt="Logo" className="brand-logo clipped-logo" />
      </div>
      <div className="nav-buttons">
        {isLoggedIn ? (
          <>
            <Tooltip title="logout" placement="bottom-end">
              <Chip
                avatar={
                  <Avatar
                    alt="User Avatar"
                    src="https://img.freepik.com/free-psd/3d-render-young-businesswoman-with-long-brown-hair-wearing-light-blue-blazer-white-shirt-she-looks-friendly-approachable-perfect-avatar-professional-woman_632498-32059.jpg"
                  />
                }
                label={user.fname}
                variant="outlined"
                onClick={handleLogout}
              />
            </Tooltip>
          </>
        ) : (
          <>
            <button
              onClick={() => handleNavigate("/login")}
              className="btn btn-login"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigate("/register")}
              className="btn btn-register"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
