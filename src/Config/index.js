// export a config object for cofigured api end point as localhost as of now

const baseURL = "http://localhost:8080";
const authURL = "http://localhost:8080/api/auth";

const config = {
  url: {
    home: baseURL,
    login: `${baseURL}/login`,
    register: `${baseURL}/register`,
    registerJobseekerTemp: `${baseURL}/register/jobseeker`,
    updateProfile: `${baseURL}/api/employer/update-profile`, // New endpoint for updating profile
    forgotPassword: `${authURL}/forgot-password`, // Updated Endpoint
    resendOtp: `${authURL}/resend-otp`, // New Resend OTP Endpoint
    resetPassword: `${authURL}/reset-password`
  },
  roles: {
    jobseeker: "jobseeker",
    employer: "employer",
    admin: "admin"
  }
};

export default config;
