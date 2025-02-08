import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import config from "../../Config";
import LoadingCircle from "../../components/LoadingCircle";

export default function JobSeekers() {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(config.doturl.allJobSeekers) // Replace with actual API URL
      .then((response) => response.json())
      .then((data) => {
        setJobSeekers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job seekers:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#11ACE4" }}
      >
        ALL JOB SEEKERS
      </Typography>
      {loading ? (
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
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "8px", boxShadow: 3 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#38b0ff" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  #
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Gender
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Education Level
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobSeekers.map((seeker, index) => (
                <TableRow key={seeker.jobSeekerId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{seeker.fname}</TableCell>
                  <TableCell>{seeker.email}</TableCell>
                  <TableCell>{seeker.gender}</TableCell>
                  <TableCell>{seeker.educationLevel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
