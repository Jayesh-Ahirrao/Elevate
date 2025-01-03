// export a config object for cofigured api end point as localhost as of now

const config = {
    url: {
        backendEndpoint: 'http://localhost:8080',
    },
    roles: {
        jobseeker: 'jobseeker',
        employer: 'employer',
        admin: 'admin'
    }
}

export default config;