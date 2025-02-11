// export a config object for cofigured api end point as localhost as of now

const baseURL = "http://localhost:8081";
const dotnetURL = "https://localhost:7038/Admin";
const authURL = "http://localhost:8081/api/auth";
const jpmURL = "http://localhost:8052/api/jpm";

const config = {
  url: {
    home: baseURL,
    login: `${baseURL}/login`,
    register: `${baseURL}/register`,
    registerJobseekerTemp: `${baseURL}/register/jobseeker`,
    updateProfile: `${baseURL}/api/employer/update-profile`, // New endpoint for updating profile
    changePassword: `${baseURL}/api/employer/change-password`, // New endpoint for changing password
    forgotPassword: `${authURL}/forgot-password`, // Updated Endpoint
    resendOtp: `${authURL}/resend-otp`, // New Resend OTP Endpoint
    resetPassword: `${authURL}/reset-password`,
    createJobPost: `${jpmURL}/create`,
    employerStats: `${jpmURL}/employer/stats`,
    employerJobs: `${jpmURL}/jobs`,
    deleteJob: `${jpmURL}/delete`,
    updateJob: `${jpmURL}/update`
  },
  doturl: {
    totalEmployers: `${dotnetURL}/totalEmployers`,
    totalJobSeekers: `${dotnetURL}/totalJobSeekers`,
    activeJobs: `${dotnetURL}/activeJobs`,
    allEmployers: `${dotnetURL}/allEmployers`,
    allJobSeekers: `${dotnetURL}/allJobSeekers`,
    topCity: `${dotnetURL}/cityMaxJobs`
  },
  roles: {
    jobseeker: "jobseeker",
    employer: "employer",
    admin: "admin"
  }
};

export default config;
