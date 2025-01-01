import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const StepIndicator = ({ currentStep, role }) => {
  
  const getSteps = () => {
    if (!role) return ['Select Role'];
    return ['Select Role', 'Basic Info', 'Additional Info', 'Final Steps'];
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