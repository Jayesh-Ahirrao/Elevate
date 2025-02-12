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

export default function JobSeekerProfile() {
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);
  
  const [jobSeekerInfo, setJobSeekerInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    resumeLink: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const { userData } = JSON.parse(storedUser);
      if (userData) {
        setJobSeekerInfo({
          fname: userData.fname || "",
          lname: userData.lname || "",
          email: userData.email || "",
          contact: userData.contact || "",
          resumeLink: userData.resumeLink || ""
        });
      }
    }
  }, []);

  // Validation functions
  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidContact = contact => /^\d{10}$/.test(contact);
  const isValidGoogleDriveLink = link => /^https:\/\/drive\.google\.com\//.test(link);

  // Function to update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess(false);
  
    if (!isValidEmail(jobSeekerInfo.email)) {
      setProfileError("Invalid email format");
      return;
    }
  
    if (!isValidContact(jobSeekerInfo.contact)) {
      setProfileError("Contact number must be 10 digits");
      return;
    }
  
    if (jobSeekerInfo.resumeLink && !isValidGoogleDriveLink(jobSeekerInfo.resumeLink)) {
      setProfileError("Invalid Google Drive link");
      return;
    }
  
    try {
      const response = await fetch(config.url.updateProfile, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: jobSeekerInfo.email,
          contact: jobSeekerInfo.contact,
          resume: jobSeekerInfo.resumeLink, // Ensure correct field name
          oldEmail: JSON.parse(localStorage.getItem("userData")).userData.email,
        }),
      });
  
      if (response.ok) {
        setProfileSuccess("Profile updated successfully!");
  
         // Get the existing data from localStorage
      const storedUserData = JSON.parse(localStorage.getItem("userData"));

      // Update only the userData part without overriding the token
      const updatedUserData = {
        ...storedUserData, // Keep the token
        userData: {
          ...storedUserData.userData, // Preserve existing userData
          email: jobSeekerInfo.email,
          contact: jobSeekerInfo.contact,
          resume: jobSeekerInfo.resumeLink, // Ensure correct field name
        },
      };
        // Update localStorage with merged data
        localStorage.setItem("userData", JSON.stringify(updatedUserData ));
      } else {
        setProfileError("Failed to update profile!");
      }
    } catch (err) {
      setProfileError("An error occurred while updating profile.");
    }
  };
  

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 3, borderRadius: "8px", boxShadow: 3, mb: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
          JOB SEEKER PROFILE
        </Typography>

        {profileError && <Alert severity="error" sx={{ mb: 2 }}>{profileError}</Alert>}
        {profileSuccess && <Alert severity="success" sx={{ mb: 2 }}>{profileSuccess}</Alert>}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              value={jobSeekerInfo.fname}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={jobSeekerInfo.lname}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={jobSeekerInfo.email}
              onChange={e => setJobSeekerInfo({ ...jobSeekerInfo, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Contact"
              value={jobSeekerInfo.contact}
              onChange={e => setJobSeekerInfo({ ...jobSeekerInfo, contact: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Resume Google Drive Link"
              value={jobSeekerInfo.resumeLink}
              onChange={e => setJobSeekerInfo({ ...jobSeekerInfo, resumeLink: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button
          onClick={handleProfileUpdate}
          variant="contained"
          sx={{ mt: 2, bgcolor: "#38BFF0", "&:hover": { bgcolor: "#01579b" } }}
        >
          Update Profile
        </Button>
      </Paper>
    </Box>
  );
}
