import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Container, Typography, Paper } from "@mui/material";
// import { UserCircle } from 'lucide-react';

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

function Register() {
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const [state, setState] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setState((prev) => ({
      ...prev,
      role,
      currentStep: STEPS.BASIC_INFO,
    }));
  };

  const handleUpdateForm = (field, value) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
    }));
  };

  const handleUpdateEmployerForm = (field, value) => {
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        employerFormData: {
          ...prev.formData.employerFormData,
          [field]: value,
        },
      },
    }));
  };

  const handleNext = () => {
    const validation = validateForm(
      state.currentStep,
      state.formData,
      state.role
    );
    console.log(validation);
    if (validation.valid) {
      if (state.currentStep === STEPS.FINAL_STEPS) {
        handleSubmit(state);
      } else {
        setState((prev) => ({
          ...prev,
          currentStep: prev.currentStep + 1,
        }));
      }
    } else {
      alert(validation.message);
    }
  };

  const handleBack = () => {
    setState((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  const handleSubmit = async (state) => {

    try {
      const response = await fetch(config.url.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: state.role.toUpperCase(),
          ...state.formData.employerFormData,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      
      setUser(data);
      setIsLoggedIn(true);
      localStorage.setItem('userRole', data.role.roleName.toLowerCase());
      navigate('/');
      console.log("Registration successful:", data);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <Container maxWidth="md">
        <Paper className={styles.formCard}>
          <div className={styles.header}>
            {/* <UserCircle size={48} className="mx-auto mb-4" /> */}
            <Typography variant="h4" gutterBottom>
              Elevate : Job Board
            </Typography>
            <Typography variant="body1" className={styles.title}>
              elevate with your ABILITIES
            </Typography>
          </div>

          <StepIndicator currentStep={state.currentStep} role={state.role} />

          <div className={styles.formStep}>
            {state.currentStep === STEPS.ROLE_SELECTION ? (
              <RoleSelection
                selectedRole={state.role}
                onRoleSelect={handleRoleSelect}
              />
            ) : state.role === "jobseeker" ? (
              <JobSeekerForm
                formData={state.formData}
                onUpdateForm={handleUpdateForm}
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

          <NavigationButtons
            currentStep={state.currentStep}
            isLastStep={state.currentStep === STEPS.FINAL_STEPS}
            onBack={handleBack}
            onNext={handleNext}
          />
        </Paper>
      </Container>
    </div>
  );
}

export default Register;
