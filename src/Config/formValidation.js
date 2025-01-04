import config from ".";

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateForm = (step, formData, role) => {
  if (role === config.roles.jobseeker) {
    return validateJobSeeker(step, formData.jobseekerFormData);
  } else if (role === config.roles.employer) {
    return validateEmployer(step, formData.employerFormData);
  }
};

const validateEmployer = (currStep, formData) => {
  switch (currStep) {
    case 1: // BASIC_INFO
      if (!validateEmail(formData.email)) {
        return { valid: false, message: "Invalid email address." };
      }
      if (!formData.password || formData.password.length < 6) {
        return {
          valid: false,
          message: "Password must be at least 6 characters long.",
        };
      }
      if (
        !formData.confirmPassword ||
        formData.password !== formData.confirmPassword
      ) {
        return { valid: false, message: "Passwords do not match." };
      }
      return { valid: true, message: "Basic info is valid." };

    case 2: // ADDITIONAL_INFO
      if (!formData.contact || !/^\d{10}$/.test(formData.contact)) {
        return {
          valid: false,
          message: "Contact must be a valid 10-digit number.",
        };
      }
      if (!formData.fname || formData.fname.trim() === "") {
        return { valid: false, message: "First name is required." };
      }
      if (!formData.lname || formData.lname.trim() === "") {
        return { valid: false, message: "Last name is required." };
      }
      return { valid: true, message: "Additional info is valid." };

    case 3: // FINAL_STEPS
      if (!formData.comp_name || formData.comp_name.trim() === "") {
        return { valid: false, message: "Company name is required." };
      }
      if (
        !formData.comp_size ||
        isNaN(formData.comp_size) ||
        formData.comp_size <= 0
      ) {
        return {
          valid: false,
          message: "Company size must be a positive number.",
        };
      }
      if (!formData.comp_desc || formData.comp_desc.trim() === "") {
        return { valid: false, message: "Company description is required." };
      }
      if (
        !formData.comp_url ||
        !/^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
          formData.comp_url
        )
      ) {
        return { valid: false, message: "Invalid company URL." };
      }
      return { valid: true, message: "Final steps are valid." };

    default:
      return { valid: false, message: "Invalid step." };
  }
};

const validateJobSeeker = (currStep, formData) => {
  switch (currStep) {
    case 1: // BASIC_INFO
      if (!validateEmail(formData.email)) {
        return { valid: false, message: "Invalid email address." };
      }
      if (!formData.password || formData.password.length < 6) {
        return {
          valid: false,
          message: "Password must be at least 6 characters long.",
        };
      }
      if (
        !formData.confirmPassword ||
        formData.password !== formData.confirmPassword
      ) {
        return { valid: false, message: "Passwords do not match." };
      }
      return { valid: true, message: "Basic info is valid." };

    case 2: // PERSONAL_INFO (First Name, Last Name, Contact, Gender, DOB, Address, State, City)
      if (!formData.fname || formData.fname.trim() === "") {
        return { valid: false, message: "First Name is required." };
      }
      if (!formData.lname || formData.lname.trim() === "") {
        return { valid: false, message: "Last Name is required." };
      }
      const contactRegex = /^[0-9]{10}$/; // Assuming a 10-digit contact number format
      if (!formData.contact || !contactRegex.test(formData.contact)) {
        return {
          valid: false,
          message: "Contact is required and must be a valid 10-digit number.",
        };
      }
      if (!formData.gender) {
        return { valid: false, message: "Gender is required." };
      }
      if (!formData.dob) {
        return { valid: false, message: "Date of Birth is required." };
      }
      if (!formData.addressline || formData.addressline.trim() === "") {
        return { valid: false, message: "Address Line is required." };
      }
      if (!formData.state) {
        return { valid: false, message: "State is required." };
      }
      if (!formData.city) {
        return { valid: false, message: "City is required." };
      }
      return { valid: true, message: "Personal info is valid." };
    case 3 : 
      return {valid: true, message: "Academic Information is valid." };
    default:
      return { valid: false, message: "Invalid step." };
  }
};
