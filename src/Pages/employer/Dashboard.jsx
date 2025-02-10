import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import config from "../../config";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip
} from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const employerId = user?.employer_id;

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalJobsPosted: 0,
    activeJobPosts: 0,
    totalCandidatesHired: 0
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${config.url.employerJobs}/${employerId}`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobs([...data]);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${config.url.employerStats}/${employerId}`);
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    if (employerId) {
      fetchJobs();
      fetchStats();
    }
  }, [employerId]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJobId(null);
  };

  const confirmCloseJob = (jobId) => {
    setSelectedJobId(jobId);
    setOpenDialog(true);
  };

  const handleCloseJob = async () => {
    if (!selectedJobId) return;

    try {
      const response = await fetch(`${config.url.deleteJob}/${selectedJobId}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to close job");

      fetchJobs(); // Fetch updated job list
      fetchStats(); // Fetch updated stats
    } catch (error) {
      console.error("Error closing job:", error);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              background: "#0d98ba",
              color: "white",
              borderRadius: "12px",
              boxShadow: 3
            }}
          >
            <CardContent>
              <Typography variant="h6">Total Jobs Posted</Typography>
              <Typography variant="h3">{stats.totalJobsPosted}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              background: "#0d98ba",
              color: "white",
              borderRadius: "12px",
              boxShadow: 3
            }}
          >
            <CardContent>
              <Typography variant="h6">Active Jobs</Typography>
              <Typography variant="h3">{stats.activeJobPosts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} sm={4}>
          <Card
            sx={{
              background: "#0d98ba",
              color: "white",
              borderRadius: "12px",
              boxShadow: 3
            }}
          >
            <CardContent>
              <Typography variant="h6">Total Hired</Typography>
              <Typography variant="h3">{stats.totalCandidatesHired}</Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: "8px", boxShadow: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#11ACE4", color: "white" }}>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }}>Applicants</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Posted Date</TableCell>
              <TableCell sx={{ color: "white" }}>Expiration Date</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.job_post_id}>
                <TableCell>{job.designation}</TableCell>
                <TableCell>{job.applicants}</TableCell>
                <TableCell>
                  <Chip
                    label={job.active ? "Active" : "Closed"}
                    sx={{
                      backgroundColor: job.active ? "#4CAF50" : "#F44336",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(job.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(job.deadline).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    size="small"
                    sx={{
                      mr: 1,
                      bgcolor: "#4CAF50",
                      color: "white",
                      borderRadius: "8px",
                      "&:hover": { bgcolor: "#2E7D32" }
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<CloseIcon />}
                    color="error"
                    size="small"
                    sx={{ borderRadius: "8px" }}
                    onClick={() => confirmCloseJob(job.job_post_id)}
                  >
                    Close
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Close</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to close this job?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseJob} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}