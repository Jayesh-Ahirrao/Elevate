import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

const EmployerForm = ({ formData, onUpdateForm, step }) => {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Company Information
            </Typography>
            <TextField
              fullWidth
              label="Company Name"
              value={formData.companyName || ''}
              onChange={(e) => onUpdateForm('companyName', e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => onUpdateForm('email', e.target.value)}
              margin="normal"
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Additional Details
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Company Size</InputLabel>
              <Select
                value={formData.companySize || ''}
                onChange={(e) => onUpdateForm('companySize', e.target.value)}
                label="Company Size"
              >
                <MenuItem value="1-10">1-10 employees</MenuItem>
                <MenuItem value="11-50">11-50 employees</MenuItem>
                <MenuItem value="51-200">51-200 employees</MenuItem>
                <MenuItem value="201-500">201-500 employees</MenuItem>
                <MenuItem value="501+">501+ employees</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Company Website"
              value={formData.website || ''}
              onChange={(e) => onUpdateForm('website', e.target.value)}
              margin="normal"
            />
            {/* <TextField
              fullWidth
              label="Your Position"
              value={formData.position || ''}
              onChange={(e) => onUpdateForm('position', e.target.value)}
              margin="normal"
            /> */}
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Account Security
            </Typography>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password || ''}
              onChange={(e) => onUpdateForm('password', e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword || ''}
              onChange={(e) => onUpdateForm('confirmPassword', e.target.value)}
              margin="normal"
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  return <Box sx={{ mt: 2 }}>{renderStep()}</Box>;
};

export default EmployerForm;