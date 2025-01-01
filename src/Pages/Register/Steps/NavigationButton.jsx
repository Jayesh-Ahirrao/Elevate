import React from 'react';
import { Button } from '@mui/material';
import styles from '../Registration.module.css';

const NavigationButtons = ({ currentStep, isLastStep, onBack, onNext }) => {
  return (
    <div className={styles.navigationButtons}>
      <Button disabled={currentStep === 0} onClick={onBack}>
        Back
      </Button>
      <Button variant="contained" onClick={onNext}>
        {isLastStep ? 'Submit' : 'Next'}
      </Button>
    </div>
  );
};

export default NavigationButtons;