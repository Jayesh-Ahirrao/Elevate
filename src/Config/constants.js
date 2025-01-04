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
    jobseekerFormData: {
      email: "",
      password: '',
      confirmPassword: '',
      contact: '',
      fname: '',
      lname: '',
      udid: '',
            
      gender: '' , //caps
      dob: '', //YYYY/MM/DD
      experiance: "", //Enum 

    },
    employerFormData: {
      email: "",
      password: '',
      confirmPassword: '',
      contact: '',
      fname: '',
      lname: '',
      comp_name: '',
      comp_size: 1,
      comp_desc: '',
      comp_url: ''
    }
  },
};