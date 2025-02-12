import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import config from "../../Config";
import { UserContext } from "../../App";
import LoadingCircle from "../../components/LoadingCircle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Use Context and Navigation
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDummyLogin = () => {
    try {
      const jsonString = `{
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGl0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzM5MzExMTA5LCJleHAiOjE3MzkzNDcxMDl9.fCSvKqpF059O3MHWuBrkd7xzYtQmwvNOAC-QR27-Mgw",
        "userData": {
            "email": "shit@example.com",
            "password": "shit123",
            "contact": "4564578903",
            "fname": "clear",
            "lname": "roshan",
            "roleName": "JOBSEEKER",
            "gender": "MALE",
            "dob": "1995-06-15T00:00:00.000+00:00",
            "experience": 3,
            "educationLevel": "DIPLOMA",
            "profilePic": "https://example.com/profile-pictures/john_doe.jpg",
            "resume": "https://example.com/resumes/john_doe_resume.pdf",
            "detailedAddress": "123 Elm Street, Springfield, IL, USA",
            "cityId": 13,
            "udId": "KL3450119800000227",
            "skillSetIds": null
        }
    }`;

      const userDataParsed = JSON.parse(jsonString);
      const { token, userData } = userDataParsed;

      localStorage.setItem("userData", JSON.stringify({ token, userData }));
      localStorage.setItem("userRole", userData.roleName);
      localStorage.setItem("isLoggedIn", "true");

      setUser(userData);
      setIsLoggedIn(true);

      // Redirect based on role
      if (userData.roleName === "ADMIN") {
        navigate("/analytics");
      } else if (userData.roleName === "EMPLOYER") {
        navigate("/dashboard");
      } else if (userData.roleName === "JOBSEEKER") {
        navigate("/landing");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.url.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const responseData = await response.json();

      console.log("API Response:", responseData);

      const { token, jobSeeker, employer, admin } = responseData;

      let userData = admin || employer || jobSeeker;

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
      if (userData.roleName === "ADMIN") {
        navigate("/analytics");
      } else if (userData.roleName === "EMPLOYER") {
        navigate("/dashboard");
      } else if (userData.roleName === "JOBSEEKER") {
        navigate("/landing");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* <form className={styles.form} onSubmit={handleDummyLogin}> */}
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? <LoadingCircle /> : "Login"}
          </button>
        </form>

        {/* Show progress indicator below the button when loading */}
        {loading && (
          <div className={styles.loadingWrapper}>
            <LoadingCircle />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
          <p className="registrationLink">
            New here? <Link to="/register">Register</Link>
          </p>
          <p className="forgotPassword">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
