import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../Pages/employer/Dashboard";
import Applicants from "../Pages/employer/Applicants";
import Meetings from "../Pages/employer/Meetings";
import JobPost from "../Pages/employer/JobPost";
import Settings from "../Pages/employer/Settings";
import config from "../Config";

const RoleBasedRoutes = ({ userRole }) => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={[config.roles.employer]}
            userRole={userRole}
          >
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applicants"
        element={
          <ProtectedRoute
            allowedRoles={[config.roles.employer]}
            userRole={userRole}
          >
            <Applicants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/meetings"
        element={
          <ProtectedRoute
            allowedRoles={[config.roles.employer]}
            userRole={userRole}
          >
            <Meetings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-job"
        element={
          <ProtectedRoute
            allowedRoles={[config.roles.employer]}
            userRole={userRole}
          >
            <JobPost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute
            allowedRoles={[config.roles.employer]}
            userRole={userRole}
          >
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

RoleBasedRoutes.propTypes = {
  userRole: PropTypes.string.isRequired
};

export default RoleBasedRoutes;
