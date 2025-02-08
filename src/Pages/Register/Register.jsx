import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Container, Typography, Paper } from "@mui/material";
import axios from "axios";

import styles from "./Registration.module.css";
import RoleSelection from "./RoleSelection";
import JobSeekerForm from "./Forms/JobSeekerForm";
import NavigationButtons from "./Steps/NavigationButton";
import EmployerForm from "./Forms/EmployerForm";
import StepIndicator from "./Steps/StepIndicator";

import { validateForm } from "../../Config/formValidation";
import { INITIAL_STATE, STEPS } from "../../Config/constants";
import config from "../../Config";
import { useNavigate } from "react-router-dom";
import LoadingCircle from "../../components/LoadingCircle"; // Import LoadingCircle component

function Register() {
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const [state, setState] = useState(INITIAL_STATE);
  const [successMessage, setSuccessMessage] = useState(""); // Added state for success message
  const [isLoading, setIsLoading] = useState(false); // Added state for loading indicator
  const navigate = useNavigate();

  const handleRoleSelect = role => {
    setState(prev => ({
      ...prev,
      role, 
      currentStep: STEPS.BASIC_INFO
    }));
  };

  const handleUpdateJobseekerForm = (field, value) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        jobseekerFormData: {
          ...prev.formData.jobseekerFormData,
          [field]: value
        }
      }
    }));
  };

  const handleUpdateEmployerForm = (field, value) => {
    setState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        employerFormData: {
          ...prev.formData.employerFormData,
          [field]: value
        }
      }
    }));
  };

  const handleNext = () => {
    const validation = validateForm(
      state.currentStep,
      state.formData,
      state.role
    );

    if (validation.valid) {
      if (state.currentStep === STEPS.FINAL_STEPS) {
        handleSubmit(state);
      } else {
        setState(prev => ({
          ...prev,
          currentStep: prev.currentStep + 1
        }));
      }
    } else {
      alert(validation.message);
    }
  };

  const handleBack = () => {
    setState(prev => ({
      ...prev,
      currentStep: prev.currentStep - 1
    }));
  };

  const submitEmployerForm = async formData => {
    try {
      const { confirmPassword, ...filteredFormData } = formData;

      const response = await axios.post(config.url.register, {
        roleName: "EMPLOYER",
        ...filteredFormData
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error submitting employer form: ${error.message}`);
    }
  };

  const submitJobseekerForm = async formData => {
    try {
      // Destructure and rename fields to match backend expectations
      const { confirmPassword, udid, city,addressline,  ...rest } = formData;
  
      const response = await axios.post(config.url.registerJobseekerTemp, {
        roleName: "JOBSEEKER",
        udId: udid, // Map 'udid' to 'udId'
        cityId: city, // Map 'city' to 'cityId'
        detailedAddress : addressline,
        ...rest
      });
      console.log("Jobseeker form submitted:", response.data); // Debugging
      return response.data;
    } catch (error) {
      throw new Error(`Error submitting jobseeker form: ${error.message}`);
    }
  };

  const handleSubmit = async state => {
    try {
      setIsLoading(true); // Set loading to true
      let responseData;

      if (state.role === config.roles.employer) {
        responseData = await submitEmployerForm(state.formData.employerFormData);
      } else if (state.role === config.roles.jobseeker) {
        responseData = await submitJobseekerForm(state.formData.jobseekerFormData);
      } else {
        throw new Error("Invalid role");
      }

      const username =
        state.role === config.roles.employer
          ? state.formData.employerFormData.fname
          : state.formData.jobseekerFormData.fname;

      setUser({ ...responseData, fname: username });
      setIsLoggedIn(true);

      setSuccessMessage("Registration successful! A welcome email has been sent to your email address."); // Display success message

      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate("/", {
          state: { isEmployer: state.role === config.roles.employer }
        });
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Failed to register. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <Container maxWidth="md">
        <Paper className={styles.formCard}>
          <div className={styles.header}>
            <Typography variant="h4" gutterBottom>
              <span
                style={{
                  fontFamily: "League Spartan",
                  fontWeight: "bolder",
                  fontSize: "45px",
                  letterSpacing: "-4px"
                }}
              >
                elevate
              </span>{" "}
              <span style={{ fontFamily: "Quicksand", fontWeight: "light" }}>
                jobs
              </span>
            </Typography>
            <Typography variant="body1" className={styles.title}>
              elevate with your abilities
            </Typography>
          </div>

          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '0.5rem'}}>
              <LoadingCircle />
            </div>
          ) : successMessage ? (
            <Typography variant="h6" color="primary" align="center">
              {successMessage}
            </Typography>
          ) : (
            <>
              <StepIndicator currentStep={state.currentStep} role={state.role} />

              <div className={styles.formStep}>
                {state.currentStep === STEPS.ROLE_SELECTION ? (
                  <RoleSelection
                    selectedRole={state.role}
                    onRoleSelect={handleRoleSelect}
                  />
                ) : state.role === config.roles.jobseeker ? (
                  <JobSeekerForm
                    formData={state.formData.jobseekerFormData}
                    onUpdateForm={handleUpdateJobseekerForm}
                    step={state.currentStep}
                  />
                ) : (
                  <EmployerForm
                    formData={state.formData.employerFormData}
                    onUpdateForm={handleUpdateEmployerForm}
                    step={state.currentStep}
                  />
                )}
              </div>

              {state.currentStep !== STEPS.ROLE_SELECTION && (
                <NavigationButtons
                  currentStep={state.currentStep}
                  isLastStep={state.currentStep === STEPS.FINAL_STEPS}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Register;
