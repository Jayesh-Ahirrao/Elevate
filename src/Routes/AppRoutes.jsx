import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import role-based routes
import RoleBasedRoutes from './RoleBasedRoutes';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import LandingPage from '../Pages/LandingPage/LandindPage';




const AppRoutes = ({ userRole, isLoggedIn }) => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
