import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import role-based routes
import RoleBasedRoutes from './RoleBasedRoutes';

const AppRoutes = ({ userRole, isLoggedIn }) => {
    return (
        <Routes>
            <Route path="/" element={<h2>Hello Home</h2>} />
            <Route path="/login" element={<h2>login</h2>} />
            <Route path="/register" element={<h2>register</h2>} />
            <Route path="/unauthorized" element={<h2>unauthorized</h2>} />

            {/* Role-Based Routes */}
            {isLoggedIn && (
                <Route path="/*" element={<RoleBasedRoutes userRole={userRole} />} />
            )}
        </Routes>
    );
};

AppRoutes.propTypes = {
    userRole: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRoutes;
