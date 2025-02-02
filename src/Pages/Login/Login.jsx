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
        throw new Error("Invalid credentials");
      }

      const { token, employer } = await response.json();

      localStorage.setItem("userData", JSON.stringify({ token, employer }));
      setUser(employer);
      setIsLoggedIn(true);

      // Check if role is 'EMPLOYER' and navigate accordingly
      if (employer.roleName === "EMPLOYER") {
        console.log("Redirecting to employer dashboard");
        console.log("Employer role:", employer.roleName);
        navigate("/dashboard");
      } else {
        console.log("Redirecting to landing page");
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <button type="submit" className={styles.loginButton} disabled={loading}>
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
  );
};

export default Login;
