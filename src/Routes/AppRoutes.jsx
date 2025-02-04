import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "../components/Layout";  

import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import LandindPage from "../Pages/LandingPage/LandindPage";
import Dashboard from "../Pages/employer/Dashboard";
import Applicants from "../Pages/employer/Applicants";
import Meetings from "../Pages/employer/Meetings";
import Settings from "../Pages/employer/Settings";
import JobPost from "../Pages/employer/JobPost"

const AppRoutes = ({ userRole, isLoggedIn }) => {
  return (
    <Routes>
      <Route path="/" element={<LandindPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<h2>Unauthorized</h2>} />

      {/* Protect routes that require login and role check */}
      {isLoggedIn ? (
        userRole === "EMPLOYER" ? (
          <>
            {/* Wrap dashboard-related routes with Layout */}
            <Route path="/dashboard" element={<Layout children={<Dashboard />} />} />
            <Route path="/applicants" element={<Layout children={<Applicants />} />} />
            <Route path="/meetings" element={<Layout children={<Meetings />} />} />
            <Route path="/settings" element={<Layout children={<Settings />} />} />
            <Route path="/post-job" element={<Layout children={<JobPost />} />} />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/" />} />
        )
      ) : (
        <Route path="/*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

AppRoutes.propTypes = {
  userRole: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRoutes;
