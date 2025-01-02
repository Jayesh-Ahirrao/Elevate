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
                Login Information
            </Typography>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => onUpdateForm('email', e.target.value)}
              margin="normal"
              required
            />

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

        //   <>
        //     <Typography variant="h6" gutterBottom>
        //       Company Information
        //     </Typography>
        //     <TextField
        //       fullWidth
        //       label="Company Name"
        //       value={formData.companyName || ''}
        //       onChange={(e) => onUpdateForm('companyName', e.target.value)}
        //       margin="normal"
        //       required
        //     />
        //     <TextField
        //       fullWidth
        //       label="Email"
        //       type="email"
        //       value={formData.email || ''}
        //       onChange={(e) => onUpdateForm('email', e.target.value)}
        //       margin="normal"
        //       required
        //     />
        //   </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Additional Details
            </Typography>
            <TextField
            fullWidth
            label="First Name"
            value={formData.firstName || ''}
            onChange={(e) => onUpdateForm('firstName', e.target.value)}
            margin="normal"
            required
            />
            <TextField
            fullWidth
            label="Last Name"
            value={formData.lastName || ''}
            onChange={(e) => onUpdateForm('lastName', e.target.value)}
            margin="normal"
            />
            <TextField
            fullWidth
            label="Contact"
            type="number"
            value={formData.contact || ''}
            onChange={(e) => onUpdateForm('contact', e.target.value)}
            margin="normal"
            required
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
              type="number"
              min="1"
              label="Company Size"
              value={formData.companySize || ''}
              onChange={(e) => onUpdateForm('companySize', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Company Website"
              value={formData.website || ''}
              onChange={(e) => onUpdateForm('website', e.target.value)}
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

export default EmployerForm;