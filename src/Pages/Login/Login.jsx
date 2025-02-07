import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import config from "../../Config";
import { UserContext } from "../../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.url.home}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);

      const { token, jobSeeker, employer } = responseData;

      let userData = employer || jobSeeker; // Assign correct user object

      if (!token || !userData) {
        throw new Error("Missing token or user data in response");
      }

      // Save user data in localStorage
      localStorage.setItem("userData", JSON.stringify({ token, userData }));
      localStorage.setItem("userRole", userData.roleName);
      localStorage.setItem("isLoggedIn", "true");

      setUser(userData);
      setIsLoggedIn(true);

      // Redirect based on role
      if (userData.roleName === "EMPLOYER") {
        navigate("/dashboard");
      } else if (userData.roleName === "JOBSEEKER") {
        navigate("/landing");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          New here? <Link to="/register">Register</Link>
        </p>
        {error &&
          <p className={styles.error}>
            {error}
          </p>}
      </div>
    </div>
  );
};

export default Login;
