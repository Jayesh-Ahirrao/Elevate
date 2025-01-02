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
        // if (role === 'jobseeker') {
        //   return formData.disability;
        // }
        // return formData.companySize;

        // TODO:we will send a request to the server to validate the UDID 
        return true;


      case 3:
        return true;  
      //return validatePassword(formData.password) && formData.password === formData.confirmPassword;
      default:
        return true;
    }
  };