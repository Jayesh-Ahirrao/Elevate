import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../public/logo.png";
import "./Navbar.css";
import { UserContext } from "../../../App";

const Navbar = () => {
  const { user, isLoggedIn, setIsLoggedIn, setUser } = useContext(UserContext);
  console.log("User value  ->>> "+user);
  console.log("Login value  ->> "+isLoggedIn);
  
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="brand-logo clipped-logo" />
      </div>
      <div className="nav-buttons">
        {isLoggedIn ? (
          <>
            <h4 className="hello">Hello <span className="username">{capitalizeFirstLetter(user?.fname)} </span></h4>
            <p onClick={handleLogout} className="btn-logout">Logout</p>
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
