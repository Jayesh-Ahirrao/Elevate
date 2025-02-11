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
      deadline: ""
    });

    const [cities, setCities] = useState([]);
    const [disabilityCategories, setDisabilityCategories] = useState([]);
    const [jobTypes, setJobTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
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

    const validateForm = () => {
      let newErrors = {};
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const minDeadline = tomorrow.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
  
      // Required fields
      Object.keys(formData).forEach((key) => {
        if (!formData[key]) newErrors[key] = "This field is required";
      });
  
      // Experience Validation
      if (formData.min_exp < 0) newErrors.min_exp = "Experience must be a positive value";
      if (formData.max_exp < 0) newErrors.max_exp = "Experience must be a positive value";
      if (formData.min_exp && formData.max_exp && Number(formData.min_exp) > Number(formData.max_exp)) {
        newErrors.min_exp = "Min experience cannot be greater than max experience";
      }
  
      // Salary Validation
      if (formData.min_sal < 0) newErrors.min_sal = "Salary must be a positive value";
      if (formData.max_sal < 0) newErrors.max_sal = "Salary must be a positive value";
      if (formData.min_sal && formData.max_sal && Number(formData.min_sal) > Number(formData.max_sal)) {
        newErrors.min_sal = "Min salary cannot be greater than max salary";
      }
  
      // Deadline Validation
      if (formData.deadline && formData.deadline < minDeadline) {
        newErrors.deadline = `Deadline must be at least ${minDeadline}`;
      }
  
      // Number of Rounds Validation
      if (formData.no_of_rounds < 1) {
        newErrors.no_of_rounds = "Number of rounds must be at least 1";
      }
  
      // Select fields validation
      if (!formData.job_type) newErrors.job_type = "Please select a job type";
      if (!formData.job_category) newErrors.job_category = "Please select a job category";
      if (!formData.cityId) newErrors.cityId = "Please select a city";
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    };
  
  

    const handleSubmit = async () => {
      if (!validateForm()) return;  
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
                error={!!errors.designation}
              helperText={errors.designation}
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
                error={!!errors.job_desc}
                helperText={errors.job_desc}
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
                error={!!errors.job_type}
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
              {errors.job_type && (
              <Typography color="error">{errors.job_type}</Typography>
            )}
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
                error={!!errors.job_category}
              >
                <MenuItem value="" disabled>
                  Select Disability Category
                </MenuItem>
                {disabilityCategories.length > 0 &&
                  disabilityCategories.map((disabilityCat) => (
                    <MenuItem
                      key={disabilityCat.disabilityCatId}
                      value={disabilityCat.disabilityCatName}
                      sx={{ color: "black" }}
                    >
                      {disabilityCat.disabilityCatName}
                    </MenuItem>
                  ))}
              </Select>
              {errors.job_category && (
              <Typography color="error">{errors.job_category}</Typography>
            )}
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
                error={!!errors.comp_desc}
              helperText={errors.comp_desc}
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
                error={!!errors.min_exp}
                helperText={errors.min_exp}
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
                error={!!errors.max_exp}
                helperText={errors.max_exp}
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
                error={!!errors.min_sal}
              helperText={errors.min_sal}
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
                error={!!errors.max_sal}
                helperText={errors.max_sal}
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
                helperText={errors.no_of_rounds}
                inputProps={{ min: 1, step: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                fullWidth
                name="cityId"
                value={formData.cityId}
                onChange={handleChange}
                displayEmpty
                variant="outlined"
                error={!!errors.cityId}
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
              {errors.cityId && (
              <Typography color="error">{errors.cityId}</Typography>
            )}
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
                error={!!errors.detailed_address}
              helperText={errors.detailed_address}
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
                error={!!errors.deadline}
              helperText={errors.deadline}

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
