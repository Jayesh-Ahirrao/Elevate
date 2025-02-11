import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";

const mockApplicants = [
  {
    id: 1,
    name: "John Doe",
    status: "Pending",
    information: "Applied for Senior React Developer"
  }
];

export default function Applicants() {
  const [openMeeting, setOpenMeeting] = useState(false);
  const [meetingData, setMeetingData] = useState({
    time: "",
    duration: "",
    type: "online"
  });

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
      >
        APPLICANTS
      </Typography>

      {/* Filter and Search Section (Updated to Match Dashboard.jsx) */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#f5f5f5",
          padding: 2,
          borderRadius: "8px"
        }}
      >
        {/* Left side: Job Status and Search */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Job Status</InputLabel>
            <Select defaultValue="all" label="Job Status">
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
              width: "160px",
              backgroundColor: "white",
              borderRadius: "4px",
              height: "40px",
              input: { height: "21px" }
            }}
          />
        </Box>

        {/* Right side: Sort By */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select defaultValue="newest" label="Sort By">
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
            <TableRow sx={{ backgroundColor: "#38BFF0" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Information
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockApplicants.map(applicant =>
              <TableRow key={applicant.id}>
                <TableCell>
                  {applicant.name}
                </TableCell>
                <TableCell>
                  {applicant.status}
                </TableCell>
                <TableCell>
                  {applicant.information}
                </TableCell>
                <TableCell>
                  {/* <Button
                    variant="contained"
                    size="small"
                    sx={{ m: 1, backgroundColor: "#1976d2", color: "white" }}
                    onClick={() => setOpenMeeting(true)}
                  >
                    Create Meeting
                  </Button>
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="outlined"
                    size="small"
                    sx={{ m: 1, borderColor: "#1976d2", color: "#1976d2" }}
                  >
                    Resume
                  </Button> */}
                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    sx={{ m: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    sx={{ m: 1 }}
                  >
                    Reject
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
