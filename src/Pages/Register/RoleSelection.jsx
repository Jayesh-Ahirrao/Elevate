import React from 'react';
import { Building2, UserCircle } from 'lucide-react';
import { Typography, Paper } from '@mui/material';
import styles from './Registration.module.css';
import config from '../../Config';

const RoleSelection = ({ selectedRole, onRoleSelect }) => {
  return (
    <div className={styles.roleSelection}>
      <Paper 
        className={`${styles.roleCard} ${selectedRole === config.roles.employer ? styles.roleCardSelected : ''}`}
        onClick={() => onRoleSelect(config.roles.employer)}
        elevation={3}
      >
        <Building2 size={48} className="mb-4" />
        <Typography variant="h6" gutterBottom>
          I'm an Employer
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Post jobs and find qualified candidates
        </Typography>
      </Paper>

      <Paper 
        className={`${styles.roleCard} ${selectedRole === config.roles.jobseeker ? styles.roleCardSelected : ''}`}
        onClick={() => onRoleSelect(config.roles.jobseeker)}
        elevation={3}
      >
        <UserCircle size={48} className="mb-4" />
        <Typography variant="h6" gutterBottom>
          I'm a Job Seeker
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Find the perfect job opportunity
        </Typography>
      </Paper>
    </div>
  );
};

export default RoleSelection;