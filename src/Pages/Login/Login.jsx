import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    return (
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Login</h2>
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className={styles.loginButton}>Login</button>
                </form>
                <p className={styles.registerText}>
                    New here? <Link to="/register" className={styles.registerLink}>Register</Link>
                </p>
            </div>
    );
};

export default Login;
