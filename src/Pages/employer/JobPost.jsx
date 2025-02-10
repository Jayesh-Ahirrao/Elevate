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
import config from "../../Config";

const JobPost = () => {
  const [formData, setFormData] = useState({
    designation: "",
    job_desc: "",
    job_type: "",
    job_category: "", // Corrected field name
    comp_desc: "",
    min_exp: "",
    max_exp: "",
    min_sal: "",
    max_sal: "",
    no_of_rounds: "",
    detailed_address: "",
    cityId: "",
    deadline: "",
    
  });

  const [cities, setCities] = useState([]);
  const [disabilityCategories, setDisabilityCategories] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [employerId, setEmployerId] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
  
    if (userDataString) {
      try {
        const parsedData = JSON.parse(userDataString);
        const parsedUserData = parsedData.userData; // Extracting the userData object
        const empId = parsedUserData?.employer_id;
  
        if (empId) {
          setEmployerId(empId); // Set employerId in state
        } else {
          console.warn("Employer ID is missing from userData.");
        }
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
      }
    } else {
      console.warn("No userData found in localStorage.");
    }
  }, []);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:8052/api/cities/all");
        if (!response.ok) throw new Error("Failed to fetch cities");

        const data = await response.json();
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
          "http://localhost:8052/api/disablities-categories/all"
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
        const response = await fetch("http://localhost:8052/api/job-types/all");
        if (!response.ok) throw new Error("Failed to fetch job types");

        const data = await response.json();
        setJobTypes(data);
      } catch (error) {
        console.error("Error fetching job types:", error);
      }
    };
    fetchJobTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    console.log("Form data:", formData);

    if (!employerId) {
      setError("Employer ID is missing. Please log in again.");
      return;
    }

    setLoading(true);
    setError("");

    const jobPostData = {
      ...formData,
      employer_id: employerId,
      city_id: formData.cityId,
      is_active: true // Always set to true when posting a job
    };

    console.log("Job post data:", jobPostData);

    try {
      const response = await fetch(`${config.url.createJobPost}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobPostData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("Job posted successfully!");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 5,
        p: 3,
        backgroundColor: "white"
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          Post a Job
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Designation"
              name="designation"
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Description"
              name="job_desc"
              multiline
              rows={2}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Select Job Type
              </MenuItem>
              {jobTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type.replace(/_/g, " ")}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              name="job_category"
              value={formData.job_category || ""}
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
              multiline
              rows={2}
              name="comp_desc"
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Min Experience (Years)"
              name="min_exp"
              type="number"
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Max Experience (Years)"
              name="max_exp"
              type="number"
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Min Salary ($)"
              name="min_sal"
              type="number"
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Max Salary ($)"
              name="max_sal"
              type="number"
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Number of Rounds"
              name="no_of_rounds"
              type="number"
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              name="cityId"
              value={formData.cityId}
              onChange={(e) =>
                setFormData({ ...formData, cityId: e.target.value })
              }
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Select City
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city.cityId} value={city.cityId}>
                  {city.cityName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Detailed Address"
              name="detailed_address"
              rows={2}
              multiline
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Deadline"
              name="deadline"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            <Button variant="outlined" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}	
            </Button>
          </Grid>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JobPost;
