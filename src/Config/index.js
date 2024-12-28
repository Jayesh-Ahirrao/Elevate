// export a config object for cofigured api end point as localhost as of now

const config = {
    url: {
        backend: 'http://localhost:3000',
    },
    roles: {
        jobseeker: 'jobseeker',
        employer: 'employer',
        admin: 'admin'
    }
}

export default config;