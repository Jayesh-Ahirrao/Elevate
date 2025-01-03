export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateForm = (step, formData, role) => {
  switch (step) {
    case 1:
      if (role === "jobseeker") {
        return (
          formData.firstName &&
          formData.lastName &&
          validateEmail(formData.email)
        );
      } else if (role === "employer") {
        return validateEmployer(step, formData.employerFormData);
      }
    case 2:
      // // if (role === 'jobseeker') {
      // //   return formData.disability;
      // // }
      // // return formData.companySize;

      // // TODO:we will send a request to the server to validate the UDID
      // return true;
      if (role === "jobseeker") {
        return (
          formData.firstName &&
          formData.lastName &&
          validateEmail(formData.email)
        );
      } else if (role === "employer") {
        return validateEmployer(step, formData.employerFormData);
      }

    case 3:
      if (role === "jobseeker") {
        return (
          formData.firstName &&
          formData.lastName &&
          validateEmail(formData.email)
        );
      } else if (role === "employer") {
        return validateEmployer(step, formData.employerFormData);
      }
    default:
      return true;
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
