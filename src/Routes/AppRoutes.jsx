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
import JobPost from "../Pages/employer/JobPost";

const AppRoutes = ({ userRole, isLoggedIn }) => {

  console.log("Logged-in Status in approutes", isLoggedIn);  // Debuggingggggggggggggg
  console.log("Setted User in approutes", userRole); 

  return (
    <Routes>
      <Route path="/" element={<LandindPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Use Navigate for unauthorized access if needed */}
      {/* <Route path="/unauthorized" element={<h2>Unauthorized</h2>} /> */}

      {/* More concise protected routes */}

      

      {isLoggedIn ? (
        <>
          {userRole === "EMPLOYER" && (
            <>
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} /> {/* Simplified Layout usage */}
              <Route path="/applicants" element={<Layout><Applicants /></Layout>} />
              <Route path="/meetings" element={<Layout><Meetings /></Layout>} />
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              <Route path="/post-job" element={<Layout><JobPost /></Layout>} />
              {/* Catch-all route for employer */}
              <Route path="/*" element={<Navigate to="/dashboard" />} />
            </>
          )}

          {/* Add routes for JOBSEEKER here */}
          {userRole === "JOBSEEKER" && (
            <>
              <Route path="/landing" element={<Layout><LandindPage /></Layout>} /> {/* Or your JobSeeker component */}
              {/* Add other job seeker routes */}
              <Route path="/*" element={<Navigate to="/landing" />} /> {/* Catch-all for job seeker */}
            </>
          )}

          {/* Redirect if logged in but no matching role */}
          {!userRole && <Route path="/*" element={<Navigate to="/login" />} />} {/* Handles unexpected cases */}
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />  {/* Explicitly include login route when not logged in */}
          <Route path="/register" element={<Register />} />  {/* Explicitly include register route when not logged in */}
          <Route path="/*" element={<Navigate to="/login" />} /> {/* Redirect all other routes to login */}
        </>
      )}
    </Routes>
  );
};

AppRoutes.propTypes = {
  userRole: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRoutes;