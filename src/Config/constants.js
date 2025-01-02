export const STEPS = {
    ROLE_SELECTION: 0,
    BASIC_INFO: 1,
    ADDITIONAL_INFO: 2,
    FINAL_STEPS: 3,
  };
  
  export const JS_INITIAL_STATE = {
    role: '',
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
      education: '' 
    },
  };

  export const EMPLOYER_INITIAL_STATE = {
    role: '',
    currentStep: 0,
    formData: {
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      industry: '',
      size: '',
      contactPerson: '',
      contactNumber: '',
      website: '',
      description: '',
      udid: '',
    },
  };
  
  export const JS_STEP_ONE_INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    udid: '',
  };
  
  export const JS_STEP_TWO_INITIAL_STATE = {
    skills: [],
    experience: '',
    education: '',
  };