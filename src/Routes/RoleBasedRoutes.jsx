import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProtectedRoute from './ProtectedRoute';
import EmployerDashboard from '../Pages/Dashboard/Employer/Components/EmployerDashboard/EmployerDashboard';

import config from '../Config';

const RoleBasedRoutes = ({ userRole }) => {
    return (
        <Routes>
            {/* Common Dashboard Route */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute allowedRoles={[config.roles.jobseeker, config.roles.employer, config.roles.admin]} userRole={userRole}>
                        {userRole === config.roles.jobseeker && <h2>Jobseeker Dashboard - /dashboard</h2>}
                        {userRole === config.roles.employer && <EmployerDashboard />} // ensure EmployerDashboard is displayed
                        {userRole === config.roles.admin && <h2>Admin Dashboard - /dashboard</h2>}
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

RoleBasedRoutes.propTypes = {
    userRole: PropTypes.string.isRequired,
};

export default RoleBasedRoutes;
