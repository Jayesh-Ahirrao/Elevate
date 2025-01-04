import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

const EmployerForm = ({ formData, onUpdateForm, step }) => {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => onUpdateForm("email", e.target.value)}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password || ""}
              onChange={(e) => onUpdateForm("password", e.target.value)}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword || ""}
              onChange={(e) => onUpdateForm("confirmPassword", e.target.value)}
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
            <TextField
              fullWidth
              label="First Name"
              value={formData.fname || ""}
              onChange={(e) => onUpdateForm("fname", e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              value={formData.lname || ""}
              onChange={(e) => onUpdateForm("lname", e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Contact"
              type="number"
              value={formData.contact || ""}
              onChange={(e) => onUpdateForm("contact", e.target.value)}
              margin="normal"
              required
              inputProps={{ maxLength: 10 }}
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
            <TextField
              fullWidth
              label="Company Name"
              value={formData.comp_name || ""}
              onChange={(e) => onUpdateForm("comp_name", e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="number"
              min="1"
              label="Company Size"
              value={formData.comp_size || ""}
              onChange={(e) => onUpdateForm("comp_size", e.target.value)}
              margin="normal"
              required
              inputProps={{ min: 1 }}
            />
            <TextField
              fullWidth
              label="Company Description"
              value={formData.comp_desc || ""}
              onChange={(e) => onUpdateForm("comp_desc", e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Company Website"
              value={formData.comp_url || ""}
              onChange={(e) => onUpdateForm("comp_url", e.target.value)}
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
