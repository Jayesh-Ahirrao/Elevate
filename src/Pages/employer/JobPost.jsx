import { useEffect, useState } from "react";
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
    city: "",
    deadline: "" // Added deadline field
  });

  const [cities, setCities] = useState([]);
  const [disabilityCategories, setDisabilityCategories] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cities/all");
        if (!response.ok) throw new Error("Failed to fetch cities");

        const data = await response.json();
        console.log("Fetched Cities:", data); // Debugging
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchDisabilityCategory = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/disablities-categories/all"
        );
        if (!response.ok)
          throw new Error("Failed to fetch disability categories");

        const data = await response.json();
        console.log("Fetched disability categories:", data);
        setDisabilityCategories(data);
      } catch (error) {
        console.error("Error disability categories:", error);
      }
    };
    fetchDisabilityCategory();
  }, []);

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/job-types/all");
        if (!response.ok) throw new Error("Failed to fetch job types");

        const data = await response.json();
        setJobTypes(data);
      } catch (error) {
        console.error("Error fetching job types:", error);
      }
    };
    fetchJobTypes();
  }, []);

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
              {jobTypes.length > 0 &&
                jobTypes.map((type, index) =>
                  <MenuItem key={index} value={type}>
                    {type.replace(/_/g, " ")}
                  </MenuItem>
                )}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              displayEmpty
              variant="outlined"
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>
                Select Disability Category
              </MenuItem>
              {disabilityCategories.length > 0 &&
                disabilityCategories.map(disabilityCat =>
                  <MenuItem
                    key={disabilityCat.disabilityCatId}
                    value={disabilityCat.disabilityCatName}
                    sx={{ color: "black" }}
                  >
                    {disabilityCat.disabilityCatName}
                  </MenuItem>
                )}
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
          <Grid item xs={6}>
            <Select
              fullWidth
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              displayEmpty
              variant="outlined"
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled sx={{ color: "black" }}>
                Select City
              </MenuItem>
              {cities.length > 0 &&
                cities.map(city =>
                  <MenuItem
                    key={city.cityId}
                    value={city.cityName}
                    sx={{ color: "black" }}
                  >
                    {city.cityName}
                  </MenuItem>
                )}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Application Deadline"
              name="deadline"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
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
