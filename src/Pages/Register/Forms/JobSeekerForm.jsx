import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Input,
} from '@mui/material';

const JobSeekerForm = ({ formData, onUpdateForm, step }) => {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            <TextField
              fullWidth
              label="First Name"
              value={formData.firstName || ''}
              onChange={(e) => onUpdateForm('firstName', e.target.value)}
              margin="dense"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              value={formData.lastName || ''}
              onChange={(e) => onUpdateForm('lastName', e.target.value)}
              margin="dense"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => onUpdateForm('email', e.target.value)}
              margin="dense"
              required
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                value={formData.gender || ''}
                onChange={(e) => onUpdateForm('gender', e.target.value)}
                label="Select Gender"
              >
                <MenuItem value="physical">Male</MenuItem>
                <MenuItem value="visual">Female</MenuItem>
              </Select>
            </FormControl>

            <Input
              fullWidth
              label="Date of  Birth"
              type="date"
              value={formData.dob || ''}
              onChange={(e) => onUpdateForm('dob', e.target.value)}
              margin="dense"
              required
            />
          </>
        );
      case 2:
        return (
          <>
           
            <Typography variant="h6" gutterBottom>
              Disability Information
            </Typography>

            <TextField
              fullWidth
              label="Enter UDID Number"
              type="number"
              value={formData.udid || ''}
              onChange={(e) => onUpdateForm('udid', e.target.value)}
              margin="normal"
              // required
            />
            
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Educational Information
            </Typography>
            <TextField
              fullWidth
              label="Skills (comma-separated)"
              value={formData.skills?.join(', ') || ''}
              onChange={(e) =>
                onUpdateForm('skills', e.target.value.split(',').map((s) => s.trim()))
              }
              margin="normal"
              helperText="Enter your skills separated by commas"
            />
            <TextField
              fullWidth
              label="Experience"
              multiline
              rows={4}
              value={formData.experience || ''}
              onChange={(e) => onUpdateForm('experience', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Education"
              value={formData.education || ''}
              onChange={(e) => onUpdateForm('education', e.target.value)}
              margin="normal"
            />
          </>
        );
      default:
        return null;
    }
  };

  return <Box sx={{ mt: 2 }}>{renderStep()}</Box>;
};

export default JobSeekerForm;