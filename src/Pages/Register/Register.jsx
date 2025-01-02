import React, { useState } from 'react';

import { Container, Typography, Paper } from '@mui/material';
// import { UserCircle } from 'lucide-react';

import styles from './Registration.module.css';

import RoleSelection from './RoleSelection';
import JobSeekerForm from './Forms/JobSeekerForm';
import NavigationButtons from './Steps/NavigationButton';
import EmployerForm from './Forms/EmployerForm';
import StepIndicator from './Steps/StepIndicator';


import { validateForm } from '../../Config/formValidation';
import { EMPLOYER_INITIAL_STATE, JS_INITIAL_STATE, STEPS } from '../../Config/constants';


function Register() {
  const [jsstate, setJSState] = useState(JS_INITIAL_STATE_INITIAL_STATE);
  cosnt [jsstate, setEmpState] = useState(EMPLOYER_INITIAL_STATEINITIAL_STATE);

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

  const handleNext = () => {
    if (validateForm(state.currentStep, state.formData, state.role)) {
      if (state.currentStep === STEPS.FINAL_STEPS) {
        handleSubmit();
      } else {
        setState((prev) => ({
          ...prev,
          currentStep: prev.currentStep + 1,
        }));
      }
    }
  };

  const handleBack = () => {
    setState((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', state.formData);
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
            ) : state.role === 'jobseeker' ? (
              <JobSeekerForm
                formData={state.formData}
                onUpdateForm={handleUpdateForm}
                step={state.currentStep}
              />
            ) : (
              <EmployerForm
                formData={state.formData}
                onUpdateForm={handleUpdateForm}
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