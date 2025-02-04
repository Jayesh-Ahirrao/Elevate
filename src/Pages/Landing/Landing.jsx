// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../../App';
// import styles from './Landing.css';

// const Landing = () => {
//     const { user, isLoggedIn } = useContext(UserContext);

//     return (
//         <div className={styles.landingContainer}>
//             <h1 className={styles}>Welcome to Elevate</h1>
//             {isLoggedIn ? (
//                 <p>Hello, {user.fname}!</p>
//             ) : (
//                 <div>
//                     <Link to="/login" className={styles.loginButton}>Login</Link>
//                     <Link to="/register" className={styles.registerButton}>Register</Link>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Landing;
