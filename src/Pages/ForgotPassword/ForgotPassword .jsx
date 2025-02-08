import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import styles from "../Login/Login.module.css";
import config from "../../Config";
import LoadingCircle from "../../components/LoadingCircle";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Send OTP
  const handleSendOTP = async () => {
    setError("");
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`${config.url.forgotPassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send OTP");

      setOtpSent(true);
      setMessage("OTP has been sent to your email.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setError("");
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`${config.url.resendOtp}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to resend OTP");

      setMessage("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async () => {
    setError("");
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`${config.url.resetPassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to reset password");

      // Success message with clickable login link
      setMessage(
        <span>
          Password reset successfully! You can now{" "}
          <Link to="/login" className={styles.link}>
            log in
          </Link>
          .
        </span>
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPageWrapper}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Forgot Password</h2>

        {!otpSent ? (
          <>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              onClick={handleSendOTP}
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <LoadingCircle />
                </div>
              ) : (
                "Send OTP"
              )}
            </button>
          </>
        ) : (
          <>
            <div className={styles.inputGroup}>
              <label>OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              onClick={handleResetPassword}
              className={styles.loginButton}
              disabled={loading}
              style={{
                marginBottom : "1rem",
              }}
            >
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    
                  }}
                >
                  <LoadingCircle />
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
            <button
              onClick={handleResendOTP}
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <LoadingCircle />
                </div>
              ) : (
                "Resend OTP"
              )}
            </button>
          </>
        )}
        <div
        style={{
          marginTop : "1rem"
        }}
        >
        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>

    </div>
  );
};

export default ForgotPassword;
