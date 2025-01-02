import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
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
              type="text"
              value={formData.udid || ''}
              onChange={(e) => onUpdateForm('udid', e.target.value.toUpperCase())}
              margin="normal"
              required
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
              type = "number"
              min= "0"
              label="Experience"
              value={formData.experience || ''}
              onChange={(e) => onUpdateForm('experience', e.target.value)}
              margin="normal"
            />
            {/* <TextField
              fullWidth
              label="Education"
              value={formData.education || ''}
              onChange={(e) => onUpdateForm('education', e.target.value)}
              margin="normal"
            /> */}

            

          </>
        );
      default:
        return null;
    }
  };

  return <Box sx={{ mt: 2 }}>{renderStep()}</Box>;
};

export default JobSeekerForm;