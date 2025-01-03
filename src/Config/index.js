// export a config object for cofigured api end point as localhost as of now

const baseURL =  'http://localhost:8080';

const config = {
    url: {
        home: baseURL,
        login: `${baseURL}/login`,
        register: `${baseURL}/register`,
    },
    roles: {
        jobseeker: 'jobseeker',
        employer: 'employer',
        admin: 'admin'
    }
}

export default config;