// export a config object for cofigured api end point as localhost as of now

const baseURL = "http://localhost:8081";

const config = {
  url: {
    home: baseURL,
    login: `${baseURL}/login`,
    register: `${baseURL}/register`,
    registerJobseekerTemp: `${baseURL}/register/jobseeker`,
    updateProfile: `${baseURL}/api/employer/update-profile`, // New endpoint for updating profile
    changePassword: `${baseURL}/api/employer/change-password`
  },
  roles: {
    jobseeker: "jobseeker",
    employer: "employer",
    admin: "admin"
  }
};

export default config;
