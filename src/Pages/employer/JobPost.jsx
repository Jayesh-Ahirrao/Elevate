import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const JobPost = () => {
  const [formData, setFormData] = useState({
    designation: "",
    description: "",
    jobType: "",
    category: "",
    companyDescription: "",
    minExperience: "",
    maxExperience: "",
    minSalary: "",
    maxSalary: "",
    rounds: "",
    address: "",
    city: ""
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Job Posted:", formData);
    navigate("/dashboard");
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #1976d2",
        borderRadius: "8px",
        backgroundColor: "#f5f5f5",
        boxShadow: 3
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ color: "#1976d2" }}>
          Post a Job
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Post Designation"
              name="designation"
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Description"
              name="description"
              multiline
              rows={3}
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              displayEmpty
              variant="outlined"
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>
                Select Job Type
              </MenuItem>
              <MenuItem value="Private">Private</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              name="category"
              value={formData.category}
              onChange={handleChange}
              displayEmpty
              variant="outlined"
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>
                Select Disability Category
              </MenuItem>
              <MenuItem value="Visual Impairment">Visual Impairment</MenuItem>
              <MenuItem value="Hearing Impairment">Hearing Impairment</MenuItem>
              <MenuItem value="Physical Disability">
                Physical Disability
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Description"
              name="companyDescription"
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Minimum Experience (Years)"
              name="minExperience"
              type="number"
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Maximum Experience (Years)"
              name="maxExperience"
              type="number"
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Minimum Salary ($)"
              name="minSalary"
              type="number"
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Maximum Salary ($)"
              name="maxSalary"
              type="number"
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Number of Rounds"
              name="rounds"
              type="number"
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Detailed Address"
              name="address"
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleChange}
              displayEmpty
              variant="outlined"
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>
                Select City
              </MenuItem>
              <MenuItem value="New York">New York</MenuItem>
              <MenuItem value="Los Angeles">Los Angeles</MenuItem>
              <MenuItem value="Chicago">Chicago</MenuItem>
            </Select>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/dashboard")}
              sx={{
                borderRadius: "8px",
                "&:hover": { bgcolor: "#FFEBEE" }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                borderRadius: "8px",
                bgcolor: "#4CAF50",
                "&:hover": { bgcolor: "#2E7D32" },
                color: "white"
              }}
            >
              Post Job
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JobPost;
