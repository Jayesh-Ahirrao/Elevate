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
  ListItemText,
} from "@mui/material";

// Array of states
const states = [
  { id: 1, name: "California" },
  { id: 2, name: "Texas" },
  { id: 3, name: "Florida" },
  { id: 4, name: "New York" },
];

const cityMap = {
  1: {
    cities: [
      { id: 1, name: "Los Angeles" },
      { id: 2, name: "San Francisco" },
      { id: 3, name: "San Diego" },
    ],
  },
  2: {
    cities: [
      { id: 4, name: "Houston" },
      { id: 5, name: "Dallas" },
      { id: 6, name: "Austin" },
    ],
  },
  3: {
    cities: [
      { id: 7, name: "Miami" },
      { id: 8, name: "Orlando" },
      { id: 9, name: "Tampa" },
    ],
  },
  4: {
    cities: [
      { id: 10, name: "New York City" },
      { id: 11, name: "Buffalo" },
      { id: 12, name: "Rochester" },
    ],
  },
};

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
  { id: 30, name: "Unreal Engine" },
];

const educationLevels = [
  { id: 1, label: "Diploma" },
  { id: 2, label: "Bachelors" },
  { id: 3, label: "Masters" },
  { id: 4, label: "Doctorate" },
];

// Custom debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const dummyUDID = "MH7370419810000035";

const JobSeekerForm = ({ formData, onUpdateForm, step }) => {
  const [isUdidValid, setIsUdidValid] = useState(false);
  const [isUDIDTouched, setIsUDIDTouched] = useState(false);
  const [disabilityCategories, setDisabilityCategories] = useState([]);
  const udidRef = useRef(null);

  useEffect(() => {
    // Fetch disability categories on page load
    fetch("/api/disability-categories")
      .then((response) => response.json())
      .then((data) => setDisabilityCategories(data))
      .catch((error) =>
        console.error("Error fetching disability categories:", error)
      );
  }, []);

  useEffect(() => {
    if (step === 1 && udidRef.current) {
      udidRef.current.focus();
    }
  }, [step]);

  const validateUdid = (udid) => {
    return true;
    // const regex = /^[A-Z]{2}\d{12}$/;
    // return regex.test(udid);
  };

  const handleUDIDChange = (e) => {
    setIsUDIDTouched(true);
    onUpdateForm("udid", e.target.value.toUpperCase());
    debounceValidateUdid(e.target.value.toUpperCase());
  };

  const debounceValidateUdid = debounce((udid) => {
    if (validateUdid(udid)) {
      
      if (udid === dummyUDID) {
        setIsUdidValid(true);
      } else {
        setIsUdidValid(false);
        setIsUDIDTouched(true);
      }
    } else {
      setIsUdidValid(false);
      setIsUDIDTouched(true);
    }
  }, 300);

  const getUdidHelperText = () => {
    if (isUdidValid) {
      return "UDID validated";
    } else if (isUDIDTouched) {
      return validateUdid(formData.udid)
        ? "Invalid UDID"
        : "Invalid UDID format";
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
              //add maxlen 12 for input
              label="Enter UDID Number"
              type="text"
              value={formData.udid || ""}
              onChange={handleUDIDChange}
              margin="normal"
              required
              inputRef={udidRef}
              error={!isUdidValid && formData.udid}
              helperText={getUdidHelperText()}
              FormHelperTextProps={{
                style: { color: isUdidValid ? "green" : "red" },
              }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Disability Categories</InputLabel>
              <Select
                disabled={!isUdidValid}
                multiple
                value={formData.disabilityCategories || []}
                onChange={(e) =>
                  onUpdateForm("disabilityCategories", e.target.value)
                }
                input={<Input />}
              >
                {disabilityCategories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
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
                    label="State"
                    value={formData.state || ""}
                    onChange={handleStateChange}
                    required
                  >
                    {states.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>City</InputLabel>
                  <Select
                    label="City"
                    value={formData.city || ""}
                    onChange={(e) => onUpdateForm("city", e.target.value)}
                    required
                    disabled={!formData.state}
                  >
                    {formData.state &&
                      cityMap[formData.state].cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
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
