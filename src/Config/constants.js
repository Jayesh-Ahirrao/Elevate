export const STEPS = {
    ROLE_SELECTION: 0,
    BASIC_INFO: 1,
    ADDITIONAL_INFO: 2,
    FINAL_STEPS: 3,
  };
  
  export const INITIAL_STATE = {
    role: null,
    currentStep: 0,
    formData: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      udid: '',
      skills: [],
      experience: '',
      education: '',
      companyName: '',
      companySize: '',
      website: '',
    },
  };