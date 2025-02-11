// export a config object for cofigured api end point as localhost as of now

const baseURL = "http://localhost:8050";

const authURL = `${baseURL}/auth`;
const jpmURL = `${baseURL}/jpm`;
const adminURL = `${baseURL}/admin`;



const config = {
  url: {
    home: baseURL,

    // Auth URLs
    login: `${authURL}/login`,
    register: `${authURL}/register/employer`,
    allAuthCities : `${authURL}/all-cities`,
    allAuthStates : `${authURL}/states`,  
    registerJobseekerTemp: `${authURL}/register/jobseeker`,
    updateProfile: `${authURL}/employer/update-profile`, // New endpoint for updating profile
    changePassword: `${authURL}/employer/change-password`, // New endpoint for changing password
    forgotPassword: `${authURL}/forgot-password`, // Updated Endpoint
    resendOtp: `${authURL}/resend-otp`, // New Resend OTP Endpoint
    resetPassword: `${authURL}/reset-password`,

    // JPM URLs
    createJobPost: `${jpmURL}/create`,
    allCities : `${jpmURL}/all-cities`,
    employerStats: `${jpmURL}/employer/stats`,
    employerJobs: `${jpmURL}/jobs`,
    allJobTypes : `${jpmURL}/all-job-types`,
    employerAllJobs : `${jpmURL}/all-jobs`,
    allDisCat : `${jpmURL}/all/dis-cat`,
    deleteJob: `${jpmURL}/delete`,
    updateJob: `${jpmURL}/update`
  },
  doturl: {
    totalEmployers: `${adminURL}/totalEmployers`,
    totalJobSeekers: `${adminURL}/totalJobSeekers`,
    activeJobs: `${adminURL}/activeJobs`,
    allEmployers: `${adminURL}/allEmployers`,
    allJobSeekers: `${adminURL}/allJobSeekers`,
    topCity: `${adminURL}/cityMaxJobs`
  },
  roles: {
    jobseeker: "jobseeker",
    employer: "employer",
    admin: "admin"
  }
};

export default config;
