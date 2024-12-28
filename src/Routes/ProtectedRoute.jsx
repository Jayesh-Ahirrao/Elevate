import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ allowedRoles, userRole, children }) => {
    // Check if the user's role is in the list of allowed roles
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Render children if authorized
    return children;
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    userRole: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default ProtectedRoute;

