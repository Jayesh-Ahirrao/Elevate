import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import config from "../../../Config";

const StepIndicator = ({ currentStep, role }) => {
  const getSteps = () => {
    if (!role) return ["Select Role"];
    if (role == config.roles.jobseeker) {
      return [
        "Select Role",
        "Login && UDID",
        "Personal Details",
        "Academic Details",
      ];
    } else if (role == config.roles.employer) {
      return [
        "Select Role",
        "Login Details",
        "Personal Details",
        "Company Details",
      ];
    }
  };

  return (
    <Stepper activeStep={currentStep} alternativeLabel sx={{ pt: 3, pb: 2 }}>
      {getSteps().map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepIndicator;
