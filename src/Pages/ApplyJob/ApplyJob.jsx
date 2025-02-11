import React, { useState } from "react";
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
  Chip,
} from "@mui/material";
import {
  BusinessCenter,
  LocationOn,
  AttachMoney,
  Timer,
  WorkHistory,
  Business,
  People,
  Email,
  Language,
  Description,
} from "@mui/icons-material";
import "./ApplyJob.css";
import Navbar from "../LandingPage/Navbar/Navbar";

const ApplyJob = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
    resume: null,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleClose();
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <Box className="info-item">
      <Icon className="info-icon" />
      <span className="info-label">{label}:</span>
      <span className="info-value">{value}</span>
    </Box>
  );

  return (
    <div>
      <Navbar />
      <div className="apply-job-page">
        <Container maxWidth="xl" className="apply-job-container">
          <Grid container spacing={3}>
            {/* Left Section - Job Details */}
            <Grid item xs={12} md={8}>
              <Card className="job-details-card">
                <Box className="job-header">
                  <Typography variant="h4" className="job-title">
                    Senior Software Engineer
                  </Typography>
                  <Typography variant="h5" className="company-name">
                    Tech Solutions Inc.
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
                      <InfoItem
                        icon={BusinessCenter}
                        label="Job Type"
                        value="Private"
                      />
                      <InfoItem
                        icon={LocationOn}
                        label="Location"
                        value="Hybrid"
                      />
                      <InfoItem
                        icon={AttachMoney}
                        label="Salary Range"
                        value="$80,000 - $120,000"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        icon={Timer}
                        label="Interview Rounds"
                        value="3"
                      />
                      <InfoItem
                        icon={WorkHistory}
                        label="Experience"
                        value="3-5 years"
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box className="job-description-section">
                  <Typography variant="h6" className="section-title">
                    Job Description
                  </Typography>
                  <Typography className="job-description">
                    We are looking for an experienced Software Engineer to join
                    our team. The ideal candidate will have strong
                    problem-solving skills and experience with modern web
                    technologies.
                    <br />
                    <br />
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
                  <InfoItem
                    icon={Business}
                    label="Company Name"
                    value="Tech Solutions Inc."
                  />
                  <InfoItem
                    icon={People}
                    label="Company Size"
                    value="500+ employees"
                  />
                  <InfoItem
                    icon={Email}
                    label="Email"
                    value="careers@techsolutions.com"
                  />
                  <InfoItem
                    icon={Language}
                    label="Website"
                    value="www.techsolutions.com"
                  />
                  <InfoItem
                    icon={Description}
                    label="Total Jobs Posted"
                    value="42"
                  />
                </Box>
                <Divider className="section-divider" />
                <Typography className="company-description">
                  Tech Solutions Inc. is a leading technology company
                  specializing in innovative software solutions. We're committed
                  to creating an inclusive workplace that values diversity and
                  supports employees with disabilities.
                </Typography>
              </Card>
            </Grid>

            {/* Similar Jobs Section */}
            <Grid item xs={12}>
              <Card className="similar-jobs-card">
                <Typography variant="h5" className="section-title">
                  Other Jobs
                </Typography>
                <Grid container spacing={3}>
                  {[1, 2, 3].map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job}>
                      <Card className="similar-job-item">
                        <Typography variant="h6">Software Developer</Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Tech Company {job}
                        </Typography>
                        <Box className="job-tags">
                          <Chip label="Full-time" className="job-tag" />
                          <Chip label="Remote" className="job-tag" />
                        </Box>
                        <Button variant="outlined" className="view-job-button">
                          View Details
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </Grid>

          {/* Application Form Dialog */}
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className="dialog-title">
              Apply for Position
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit} className="application-form">
                <TextField
                  label="Email"
                  type="email"
                  required
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <TextField
                  label="Phone Number"
                  type="tel"
                  required
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
                <Box className="file-upload">
                  <Button
                    variant="outlined"
                    component="label"
                    className="upload-button"
                  >
                    Upload Resume
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.resume && (
                    <Typography className="file-name">
                      {formData.resume.name}
                    </Typography>
                  )}
                </Box>
              </form>
            </DialogContent>
            <DialogActions className="dialog-actions">
              <Button onClick={handleClose} className="cancel-button">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="submit-button">
                Submit Application
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </div>
  );
};

export default ApplyJob;
