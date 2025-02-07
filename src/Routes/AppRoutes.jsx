import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Layout from "../components/Layout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import LandingPage from "../Pages/LandingPage/LandindPage";
import Dashboard from "../Pages/employer/Dashboard";
import Applicants from "../Pages/employer/Applicants";
import Meetings from "../Pages/employer/Meetings";
import Settings from "../Pages/employer/Settings";
import JobPost from "../Pages/employer/JobPost";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword ";
import { UserContext } from "../App";

const AppRoutes = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const role = user?.roleName || "";

  console.log("Logged-in Status:", isLoggedIn);
  console.log("User Role:", role);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {isLoggedIn ? (
        role === "EMPLOYER" ? (
          <>
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/applicants" element={<Layout><Applicants /></Layout>} />
            <Route path="/meetings" element={<Layout><Meetings /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/post-job" element={<Layout><JobPost /></Layout>} />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </>
        ) : role === "JOBSEEKER" ? (
          <>
            <Route path="/landing" element={<Layout><LandingPage /></Layout>} />
            <Route path="/*" element={<Navigate to="/landing" />} />
          </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )
      ) : (
        <>
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
