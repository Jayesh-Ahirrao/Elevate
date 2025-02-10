import React, { useEffect, useState, useRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Input,
  Grid,
  Checkbox,
  ListItemText
} from "@mui/material";

const skillsetPool = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Python" },
  { id: 3, name: "Java" },
  { id: 4, name: "C#" },
  { id: 5, name: "C++" },
  { id: 6, name: "HTML" },
  { id: 7, name: "CSS" },
  { id: 8, name: "React.js" },
  { id: 9, name: "Angular" },
  { id: 10, name: "Node.js" },
  { id: 11, name: "Express.js" },
  { id: 12, name: "SQL" },
  { id: 13, name: "MongoDB" },
  { id: 14, name: "AWS" },
  { id: 15, name: "Azure" },
  { id: 16, name: "Docker" },
  { id: 17, name: "Kubernetes" },
  { id: 18, name: "Machine Learning" },
  { id: 19, name: "Data Science" },
  { id: 20, name: "Artificial Intelligence" },
  { id: 21, name: "DevOps" },
  { id: 22, name: "Cybersecurity" },
  { id: 23, name: "Git" },
  { id: 24, name: "REST APIs" },
  { id: 25, name: "GraphQL" },
  { id: 26, name: "Spring Boot" },
  { id: 27, name: "Flask" },
  { id: 28, name: "Django" },
  { id: 29, name: "Unity" },
  { id: 30, name: "Unreal Engine" }
];

const educationLevels = [
  { id: 1, label: "Diploma" },
  { id: 2, label: "Bachelors" },
  { id: 3, label: "Masters" },
  { id: 4, label: "Doctorate" }
];

// Custom debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const JobSeekerForm = ({ formData, onUpdateForm, step }) => {
  const [isUdidValid, setIsUdidValid] = useState(false);
  const [isUDIDTouched, setIsUDIDTouched] = useState(false);
  const [disabilityCategories, setDisabilityCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const udidRef = useRef(null);

  

  useEffect(() => {
    if (step === 1 && udidRef.current) {
      udidRef.current.focus();
    }
  }, [step]);

  useEffect(() => {
    fetch("http://localhost:8080/api/states")
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  useEffect(() => {
    if (formData.state) {
      fetch(`http://localhost:8080/api/cities?stateId=${formData.state}`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error("Error fetching cities:", error));
    } else {
      setCities([]);
    }
  }, [formData.state]);

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
  // Function to validate UDID from the backend
  const validateUdidFromServer = async (udid) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/validate-udid?udid=${udid}`
      );
      const isValid = await response.json();
      
      setIsUdidValid(isValid);
    } catch (error) {
      console.error("Error validating UDID:", error);
      setIsUdidValid(false);
    }
  };

  const handleUDIDChange = (e) => {
    setIsUDIDTouched(true);
    const newUdid = e.target.value.toUpperCase();
    onUpdateForm("udid", newUdid);
    debounceValidateUdid(newUdid);
  };

  const debounceValidateUdid = debounce((udid) => {
    validateUdidFromServer(udid);
  }, 300);

  const getUdidHelperText = () => {
    if (isUdidValid) {
      return "UDID validated";
    } else if (isUDIDTouched) {
      return "Invalid UDID";
    }
    return "";
  };

  const handleStateChange = (e) => {
    onUpdateForm("state", e.target.value);
    onUpdateForm("city", ""); // Reset city when state changes
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TextField
              fullWidth
              label="Enter UDID Number"
              type="text"
              value={formData.udid || ""}
              onChange={handleUDIDChange}
              margin="normal"
              required
              inputRef={udidRef}
              error={!isUdidValid && isUDIDTouched}
              helperText={getUdidHelperText()}
              FormHelperTextProps={{
                style: { color: isUdidValid ? "green" : "red" }
              }}
            />

            <FormControl fullWidth margin="normal" disabled={!isUdidValid}>
              <InputLabel>Disability Categories</InputLabel>
              <Select
                multiple
                value={formData.disabilityCategories || []}
                onChange={(e) =>
                  onUpdateForm("disabilityCategories", e.target.value)
                }
                input={<Input />}
              >
                {disabilityCategories.map((category) => (
                  <MenuItem key={category.disabilityCatId} value={category.disabilityCatName}>
                    {category.disabilityCatName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => onUpdateForm("email", e.target.value)}
              margin="normal"
              required
              disabled={!isUdidValid}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password || ""}
              onChange={(e) => onUpdateForm("password", e.target.value)}
              margin="normal"
              required
              disabled={!isUdidValid}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword || ""}
              onChange={(e) => onUpdateForm("confirmPassword", e.target.value)}
              margin="normal"
              required
              disabled={!isUdidValid}
            />
          </>
        );
      case 2:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  type="text"
                  value={formData.fname || ""}
                  onChange={(e) => onUpdateForm("fname", e.target.value)}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  type="text"
                  value={formData.lname || ""}
                  onChange={(e) => onUpdateForm("lname", e.target.value)}
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Contact"
                  type="text"
                  value={formData.contact || ""}
                  onChange={(e) => onUpdateForm("contact", e.target.value)}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    value={formData.gender || ""}
                    onChange={(e) => onUpdateForm("gender", e.target.value)}
                    required
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHERS">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <ReactDatePicker
                  selected={formData.dob || null}
                  onChange={(date) => onUpdateForm("dob", date)}
                  dateFormat="MM/dd/yyyy"
                  maxDate={new Date()}
                  className="form-control"
                  customInput={
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      margin="normal"
                      required
                    />
                  }
                />  
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Address Line"
              type="text"
              value={formData.addressline || ""}
              onChange={(e) => onUpdateForm("addressline", e.target.value)}
              margin="normal"
              required
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>State</InputLabel>
                  <Select
                    value={formData.state || ""}
                    onChange={handleStateChange}
                    required
                  >
                    {states.map((state) => (
                      <MenuItem key={state.stateId} value={state.stateId}>
                        {state.stateName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>City</InputLabel>
                  <Select
                    value={formData.city || ""}
                    onChange={(e) => onUpdateForm("city", e.target.value)}
                    required
                    disabled={!formData.state}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.cityId} value={city.cityId}>
                        {city.cityName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Educational Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Education Level</InputLabel>
                  <Select
                    label="Education Level"
                    value={formData.educationLevel || ""}
                    onChange={(e) =>
                      onUpdateForm("educationLevel", e.target.value)
                    }
                    required
                  >
                    {educationLevels.map((level) => (
                      <MenuItem key={level.id} value={level.id}>
                        {level.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Experience (years)"
                  type="number"
                  value={formData.experience || ""}
                  onChange={(e) => onUpdateForm("experience", e.target.value)}
                  margin="normal"
                  inputProps={{ min: 0, max: 45 }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth margin="normal">
              <InputLabel>Skills</InputLabel>
              <Select
                label="Skills"
                multiple
                value={formData.skills || []}
                onChange={(e) => {
                  const { value } = e.target;

                  // Update the skills array with the selected values
                  onUpdateForm("skills", value);
                }}
                renderValue={(selected) => selected.join(", ")} // Display selected skills
              >
                {skillsetPool.map((skill) => (
                  <MenuItem key={skill.id} value={skill.name}>
                    <Checkbox
                      checked={formData.skills?.includes(skill.name) || false}
                    />
                    <ListItemText primary={skill.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Resume Input: Uncomment after S3 setup */}
            {/* 
            <TextField
              fullWidth
              label="Resume"
              type="text"
              value={formData.resume || ""}
              onChange={(e) => onUpdateForm("resume", e.target.value)}
              margin="normal"
              required
            />
            */}
          </>
        );

      default:
        return null;
    }
  };

  return <Box sx={{ mt: 2 }}>{renderStep()}</Box>;
};

export default JobSeekerForm;
