import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import LoadingCircle from "../../components/LoadingCircle";
import config from "../../Config";

export default function Dashboard() {
  const [totalActiveJobs, setTotalActiveJobs] = useState(0);
  const [totalEmployers, setTotalEmployers] = useState(0);
  const [totalJobSeekers, setTotalJobSeekers] = useState(0);
  const [topCity, setTopCity] = useState("N/A");

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingEmployers, setLoadingEmployers] = useState(true);
  const [loadingJobSeekers, setLoadingJobSeekers] = useState(true);
  const [loadingCity, setLoadingCity] = useState(true);

  // Fetch total active jobs
  useEffect(() => {
    fetch(config.doturl.activeJobs)
      .then((response) => response.json())
      .then((data) => {
        setTotalActiveJobs(data);
        setLoadingJobs(false);
      })
      .catch((error) => {
        console.error("Error fetching total active jobs:", error);
        setLoadingJobs(false);
      });
  }, []);

  // Fetch total employers
  useEffect(() => {
    fetch(config.doturl.totalEmployers)
      .then((response) => response.json())
      .then((data) => {
        setTotalEmployers(data);
        setLoadingEmployers(false);
      })
      .catch((error) => {
        console.error("Error fetching total employers:", error);
        setLoadingEmployers(false);
      });
  }, []);

  // Fetch total job seekers
  useEffect(() => {
    fetch(config.doturl.totalJobSeekers)
      .then((response) => response.json())
      .then((data) => {
        setTotalJobSeekers(data);
        setLoadingJobSeekers(false);
      })
      .catch((error) => {
        console.error("Error fetching total job seekers:", error);
        setLoadingJobSeekers(false);
      });
  }, []);

  // Fetch top city with the most jobs
  useEffect(() => {
    fetch(config.doturl.topCity)
      .then((response) => response.json())
      .then((data) => {
        setTopCity(data.cityName);
        setLoadingCity(false);
      })
      .catch((error) => {
        console.error("Error fetching top city:", error);
        setLoadingCity(false);
      });
  }, []);

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Total Active Jobs */}
        <Grid item xs={12} sm={3}>
          <Card
            sx={{
              background: "#38BFF0",
              color: "white",
              borderRadius: "12px",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6">Total Active Jobs</Typography>
              <Typography variant="h3">
                {loadingJobs ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <LoadingCircle />
                  </div>
                ) : (
                  totalActiveJobs
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Employers */}
        <Grid item xs={12} sm={3}>
          <Card
            sx={{
              background: "#11ACE4",
              color: "white",
              borderRadius: "12px",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6">Total Employers</Typography>
              <Typography variant="h3">
                {loadingEmployers ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <LoadingCircle />
                  </div>
                ) : (
                  totalEmployers
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Job Seekers */}
        <Grid item xs={12} sm={3}>
          <Card
            sx={{
              background: "#75D3F5",
              color: "white",
              borderRadius: "12px",
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6">Total Job Seekers</Typography>
              <Typography variant="h3">
                {loadingJobSeekers ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <LoadingCircle />
                  </div>
                ) : (
                  totalJobSeekers
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top City (Most Jobs) */}
        <Grid item xs={12} sm={3}>
          <Card
            sx={{
              background: "#3AA9C5",
              color: "white",
              borderRadius: "12px",
              boxShadow: 3,
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6">Top City(Most Jobs)</Typography>
              <Typography variant="h4">
                {loadingCity ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <LoadingCircle />
                  </div>
                ) : (
                  topCity
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
