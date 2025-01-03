export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateForm = (step, formData, role) => {
  switch (step) {
    case 1:
      if (role === 'jobseeker') {
        return formData.firstName && formData.lastName && validateEmail(formData.email);
      }
      return formData.companyName && validateEmail(formData.email);
    case 2:
      return true;
    case 3:
      return validatePassword(formData.password) && formData.password === formData.confirmPassword;
    default:
      return true;
  }
};