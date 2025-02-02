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
    <Box sx={{ p: 3, backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
      >
        APPLICANTS
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Job Status</InputLabel>
          <Select defaultValue="all" label="Job Status">
            <MenuItem value="all">All Jobs</MenuItem>
            <MenuItem value="openings">Openings</MenuItem>
            <MenuItem value="closed">Closed Jobs</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, minWidth: 200 }}
        />

        <FormControl sx={{ minWidth: 160 }}>
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
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
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
                  <Button
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
                  </Button>
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

      <Dialog open={openMeeting} onClose={() => setOpenMeeting(false)}>
        <DialogTitle>Schedule Interview</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Interview Time"
              type="datetime-local"
              value={meetingData.time}
              onChange={e =>
                setMeetingData({ ...meetingData, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Duration (minutes)"
              type="number"
              value={meetingData.duration}
              onChange={e =>
                setMeetingData({ ...meetingData, duration: e.target.value })}
            />
            <FormControl>
              <InputLabel>Interview Type</InputLabel>
              <Select
                value={meetingData.type}
                label="Interview Type"
                onChange={e =>
                  setMeetingData({ ...meetingData, type: e.target.value })}
              >
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="onsite">Onsite</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMeeting(false)} sx={{ color: "red" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1976d2", color: "white" }}
            onClick={() => setOpenMeeting(false)}
          >
            Send Meeting
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
