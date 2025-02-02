import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Grid
} from "@mui/material";

export default function Settings() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (passwords.new !== passwords.confirm) {
      setError("New passwords do not match");
      return;
    }

    // Handle password change logic here
    setSuccess(true);
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const employerInfo = {
    fname: "John",
    lname: "Doe",
    email: "john.doe@example.com",
    contact: "123-456-7890",
    companyName: "Tech Solutions Inc.",
    companySize: "50-100 employees",
    companyURL: "https://techsolutions.com"
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              value={employerInfo.fname}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Last Name" value={employerInfo.lname} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" value={employerInfo.email} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Contact" value={employerInfo.contact} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              value={employerInfo.companyName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Size"
              value={employerInfo.companySize}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company URL"
              value={employerInfo.companyURL}
            />
          </Grid>
        </Grid>
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

        {error &&
          <Alert
            severity="error"
            sx={{ mb: 2, backgroundColor: "#FFEBEE", color: "#D32F2F" }}
          >
            {error}
          </Alert>}
        {success &&
          <Alert
            severity="success"
            sx={{ mb: 2, backgroundColor: "#C8E6C9", color: "#388E3C" }}
          >
            Password updated successfully!
          </Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            value={passwords.current}
            onChange={e =>
              setPasswords({ ...passwords, current: e.target.value })}
            sx={{ mb: 2 }}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={passwords.new}
            onChange={e => setPasswords({ ...passwords, new: e.target.value })}
            sx={{ mb: 2 }}
            required
            variant="outlined"
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
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              bgcolor: "#4CAF50",
              "&:hover": { bgcolor: "#2E7D32" },
              color: "white",
              borderRadius: "8px"
            }}
          >
            Save Changes
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
