import { useState, useContext } from "react";
import { UserContext } from "../../App";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";

const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    applicants: 12,
    status: "Active",
    postedDate: "2024-02-15",
    expirationDate: "2024-03-15"
  }
];

export default function Dashboard() {

  const { user } = useContext(UserContext); // Get user from context

  // Extract job-related data from user
  const totalJobsPosted = user?.total_job_posted || 0;
  const totalCandidatesHired = user?.total_cand_hired || 0;
  const activeJobPosts = user?.active_job_posts || 0;

  const [jobFilter, setJobFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

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
              <Typography variant="h3">{totalJobsPosted}</Typography>
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
              <Typography variant="h3">{activeJobPosts}</Typography>
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
              <Typography variant="h6">Total Hired</Typography>
              <Typography variant="h3">{totalCandidatesHired}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between", // Distribute the space between left and right
          backgroundColor: "#f5f5f5",
          padding: 2,
          borderRadius: "8px"
        }}  
      >
        {/* Left side: Job Status and Search */}
        <Box sx={{ display: "flex", gap: 2 , }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Job Status</InputLabel>
            <Select
              value={jobFilter}
              label="Job Status"
              onChange={e => setJobFilter(e.target.value)}
              sx={{ height: "40px" }} // Set height for consistency
            >
              <MenuItem value="all">All Jobs</MenuItem>
              <MenuItem value="openings">Openings</MenuItem>
              <MenuItem value="closed">Closed Jobs</MenuItem>
            </Select>
          </FormControl>

          {/* Search field */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{
              width: "160px", // Smaller width for the search field
              backgroundColor: "white",
              borderRadius: "4px",
              height: "40px", // Ensuring height consistency
              input: { height: "21px" } // Adjust the input height as well
            }}
          />
        </Box>

        {/* Right side: Sort By */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOrder}
            label="Sort By"
            onChange={e => setSortOrder(e.target.value)}
            sx={{ height: "40px", borderRadius :"15px" }} // Set height for consistency
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </Box>

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
            {mockJobs.map(job =>
              <TableRow key={job.id}>
                <TableCell>
                  {job.title}
                </TableCell>
                <TableCell>
                  {job.applicants}
                </TableCell>
                <TableCell>
                  {job.status}
                </TableCell>
                <TableCell>
                  {job.postedDate}
                </TableCell>
                <TableCell>
                  {job.expirationDate}
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
                  >
                    Close
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
