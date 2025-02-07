import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Grid
} from "@mui/material";
import config from "../../Config";

export default function Settings() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [employerInfo, setEmployerInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    companyName: "",
    companySize: "",
    companyURL: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const { userData } = JSON.parse(storedUser);
      if (userData) {
        setEmployerInfo({
          fname: userData.fname || "",
          lname: userData.lname || "",
          email: userData.email || "",
          contact: userData.contact || "",
          companyName: userData.comp_name || "",
          companySize: userData.comp_size || "",
          companyURL: userData.comp_url || ""
        });
      }
    }
  }, []);

  // Function to update profile
  const handleProfileUpdate = async e => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess(false);

    try {
      const response = await fetch(config.url.updateProfile, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: employerInfo.email,
          contact: employerInfo.contact,
          oldEmail: JSON.parse(localStorage.getItem("userData")).userData.email
        })
      });

      if (response.ok) {
        setProfileSuccess("Profile updated successfully!");
        localStorage.setItem(
          "userData",
          JSON.stringify({ userData: { ...employerInfo } })
        );
      } else {
        setProfileError("Failed to update profile!");
      }
    } catch (err) {
      setProfileError("An error occurred while updating profile.");
    }
  };

  // Function to update password
  const handlePasswordChange = async e => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (passwords.new !== passwords.confirm) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      const response = await fetch(config.url.changePassword, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: employerInfo.email,
          currentPassword: passwords.current,
          newPassword: passwords.new
        })
      });

      if (response.ok) {
        setPasswordSuccess("Password updated successfully!");
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        setPasswordError("Incorrect current password or update failed!");
      }
    } catch (err) {
      setPasswordError("An error occurred while changing the password.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      {/* Profile Information Section */}
      <Paper sx={{ p: 3, borderRadius: "8px", boxShadow: 3, mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
          PROFILE INFORMATION
        </Typography>

        {profileError &&
          <Alert severity="error" sx={{ mb: 2 }}>
            {profileError}
          </Alert>}
        {profileSuccess &&
          <Alert severity="success" sx={{ mb: 2 }}>
            {profileSuccess}
          </Alert>}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              value={employerInfo.fname}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={employerInfo.lname}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={employerInfo.email}
              onChange={e =>
                setEmployerInfo({ ...employerInfo, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact"
              value={employerInfo.contact}
              onChange={e =>
                setEmployerInfo({ ...employerInfo, contact: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              value={employerInfo.companyName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Size"
              value={employerInfo.companySize}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company URL"
              value={employerInfo.companyURL}
              disabled
            />
          </Grid>
        </Grid>
        <Button
          onClick={handleProfileUpdate}
          variant="contained"
          sx={{ mt: 2, bgcolor: "#0288d1", "&:hover": { bgcolor: "#01579b" } }}
        >
          Update Profile
        </Button>
      </Paper>

      {/* Change Password Section */}
      <Paper
        sx={{
          p: 3,
          borderRadius: "8px",
          boxShadow: 3,
          backgroundColor: "#f5f5f5"
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
          CHANGE PASSWORD
        </Typography>

        {passwordError &&
          <Alert severity="error" sx={{ mb: 2 }}>
            {passwordError}
          </Alert>}
        {passwordSuccess &&
          <Alert severity="success" sx={{ mb: 2 }}>
            {passwordSuccess}
          </Alert>}

        <form onSubmit={handlePasswordChange}>
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            value={passwords.current}
            onChange={e =>
              setPasswords({ ...passwords, current: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={passwords.new}
            onChange={e => setPasswords({ ...passwords, new: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm New Password"
            value={passwords.confirm}
            onChange={e =>
              setPasswords({ ...passwords, confirm: e.target.value })}
            sx={{ mb: 3 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#4CAF50",
              "&:hover": { bgcolor: "#2E7D32" },
              color: "white"
            }}
          >
            Change Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
