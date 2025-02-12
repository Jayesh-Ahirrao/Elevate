import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  Typography,
  Box,
  Grid,
  Container,
  Divider,
  Chip
} from "@mui/material";
import {
  BusinessCenter,
  AttachMoney,
  Timer,
  WorkHistory,
  Business,
  People,
  Email,
  Language,
  Description
} from "@mui/icons-material";
import "./ApplyJob.css";
import Navbar from "../LandingPage/Navbar/Navbar";

const ApplyJob = () => {
  const location = useLocation();
  const jobDetails = location.state || {};
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
    resume: null
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    handleClose();
  };

  const handleFileChange = e => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  return (
    <div className="apply-job-page">
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Container maxWidth="xl" className="apply-job-container">
          <Grid container spacing={3}>
            {/* Left Section - Job Details */}
            <Grid item xs={12} md={8}>
              <Card className="job-details-card">
                <Box className="job-header">
                  <Typography variant="h4" className="job-title">
                    {jobDetails.title || "Job Title"}
                  </Typography>
                  <Typography variant="h5" className="company-name">
                    {jobDetails.company || "Company Name"}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    className="apply-button"
                  >
                    Apply Now
                  </Button>
                </Box>

                <Divider className="section-divider" />

                <Box className="job-info">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box className="info-item">
                        <BusinessCenter className="info-icon" />
                        <span className="info-label">Job Type:</span>
                        <span className="info-value">
                          {jobDetails.jobType || "Not Specified"}
                        </span>
                      </Box>
                      <Box className="info-item">
                        <AttachMoney className="info-icon" />
                        <span className="info-label">Salary Range:</span>
                        <span className="info-value">
                          {jobDetails.salaryRange || "Not Specified"}
                        </span>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box className="info-item">
                        <WorkHistory className="info-icon" />
                        <span className="info-label">Experience:</span>
                        <span className="info-value">
                          {jobDetails.experience || "Not Specified"}
                        </span>
                      </Box>
                      <Box className="info-item">
                        <Timer className="info-icon" />
                        <span className="info-label">Deadline:</span>
                        <span className="info-value">
                          {jobDetails.deadline || "Not Specified"}
                        </span>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/* No of Rounds */}
                <Box className="info-item">
                  <People className="info-icon" />
                  <span className="info-label">Number of Rounds:</span>
                  <span className="info-value">
                    {jobDetails.no_of_rounds || "Not Specified"}
                  </span>
                </Box>

                {/* Job Description */}
                <Box className="job-description-section">
                  <Typography variant="h6" className="section-title">
                    Job Description
                  </Typography>
                  <Typography className="job-description">
                    {jobDetails.job_description ||
                      "No job description provided."}
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Right Section - Company Details */}
            <Grid item xs={12} md={4}>
              <Card className="company-details-card">
                <Typography variant="h5" className="section-title">
                  Company Details
                </Typography>
                <Box className="company-info">
                  <Box className="info-item">
                    <Business className="info-icon" />
                    <span className="info-label">Company Name:</span>
                    <span className="info-value">
                      {jobDetails.company || "Not Specified"}
                    </span>
                  </Box>
                  <Box className="info-item">
                    <People className="info-icon" />
                    <span className="info-label">Company Size:</span>
                    <span className="info-value">500+ employees</span>
                  </Box>
                  <Box className="info-item">
                    <Email className="info-icon" />
                    <span className="info-label">Email:</span>
                    <span className="info-value">
                      careers@techsolutions.com
                    </span>
                  </Box>
                  <Box className="info-item">
                    <Language className="info-icon" />
                    <span className="info-label">Website:</span>
                    <span className="info-value">www.techsolutions.com</span>
                  </Box>
                  <Box className="info-item">
                    <Description className="info-icon" />
                    <span className="info-label">Total Jobs Posted:</span>
                    <span className="info-value">42</span>
                  </Box>
                </Box>
                <Divider className="section-divider" />
                <Typography className="company-description">
                  {jobDetails.comp_desc || "No company description provided."}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default ApplyJob;
