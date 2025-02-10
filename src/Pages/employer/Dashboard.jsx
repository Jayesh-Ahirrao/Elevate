import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import config from "../../Config";
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
  DialogTitle,
  DialogContentText,
  TextField,
  Chip,
  Select,
  MenuItem,
  Snackbar,
  Alert 
} from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const employerId = user?.employer_id;
  const [jobTypes, setJobTypes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalJobsPosted: 0,
    activeJobPosts: 0,
    totalCandidatesHired: 0
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await fetch("http://localhost:8052/api/job-types/all");
        if (!response.ok) throw new Error("Failed to fetch job types");

        const data = await response.json();
        setJobTypes(data);
      } catch (error) {
        console.error("Error fetching job types:", error);
      }
    };
    fetchJobTypes();
  }, []);
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

  // Edit Job State
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editJob, setEditJob] = useState({
    job_post_id: "",
    min_exp: "",
    max_exp: "",
    min_sal: "",
    max_sal: "",
    deadline: "",
    no_of_rounds: "",
    job_type: ""
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch Jobs
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

  // Fetch Stats
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

  const handleEditJob = (job) => {
    console.log("Selected Job for Edit:", job); // Debugging Log
    setEditJob({
      job_post_id: job.job_post_id, // Ensure this is set
      min_exp: job.min_exp,
      max_exp: job.max_exp,
      min_sal: job.min_sal,
      max_sal: job.max_sal,
      deadline: job.deadline,
      no_of_rounds: job.no_of_rounds,
      job_type: job.job_type
    });
    setOpenEditDialog(true);
  };

  // Handle Input Change
  const handleEditJobChange = (e) => {
    const { name, value } = e.target;
    setEditJob((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const updateJobPost = async () => {
    if (!editJob.job_post_id) {
      console.error("Error: job_post_id is missing.");
      return;
    }

    const job_post_id = Number(editJob.job_post_id);

    console.log("Updating Job Post:", job_post_id, editJob);

    try {
      const response = await fetch(`${config.url.updateJob}/${job_post_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          min_exp: editJob.min_exp,
          max_exp: editJob.max_exp,
          min_sal: editJob.min_sal,
          max_sal: editJob.max_sal,
          deadline: editJob.deadline,
          no_of_rounds: editJob.no_of_rounds,
          job_type: editJob.job_type
        })
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update job post");

      fetchJobs();
      setOpenEditDialog(false);

      // Show success message
      setSnackbarMessage("Updated successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <Box>
      {/* Stats Cards */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
      </Grid>

      {/* Jobs Table */}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "8px", boxShadow: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#11ACE4", color: "white" }}>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
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
                      bgcolor: job.active ? "#4CAF50" : "#BDBDBD", // Change color for disabled state
                      color: "white",
                      borderRadius: "8px",
                      "&:hover": { bgcolor: job.active ? "#2E7D32" : "#BDBDBD" }
                    }}
                    onClick={() => handleEditJob(job)}
                    disabled={!job.active} // Disable if job is closed
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
      {/* Edit Job Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          {[
            "min_exp",
            "max_exp",
            "min_sal",
            "max_sal",
            "deadline",
            "no_of_rounds",
          ].map((field) => (
            <TextField
              key={field}
              fullWidth
              margin="dense"
              label={field.replace(/_/g, " ").toUpperCase()}
              name={field}
              value={editJob[field]}
              onChange={handleEditJobChange}
            />
          ))}
          
        </DialogContent>
        <DialogContent>

        <Select fullWidth name="job_type" value={editJob.job_type} onChange={handleEditJobChange} displayEmpty>
            <MenuItem value="" disabled>Select Job Type</MenuItem>
            {jobTypes.map((type) => (
              <MenuItem key={type} value={type}>{type.replace(/_/g, " ")}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={updateJobPost} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      
    </Box>
  );
}
