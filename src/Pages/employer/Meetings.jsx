import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button
} from "@mui/material";
import { Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";

const mockMeetings = [
  {
    id: 1,
    candidate: "John Doe",
    position: "Senior React Developer",
    date: "2024-02-20 10:00 AM",
    type: "Online",
    status: "Scheduled"
  },
  {
    id: 2,
    candidate: "Jane Smith",
    position: "UX Designer",
    date: "2024-02-21 2:00 PM",
    type: "Onsite",
    status: "Completed"
  }
];

export default function Meetings() {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
      >
        SCHEDULED INTERVIEWS
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px",
          boxShadow: 3,
          backgroundColor: "#f5f5f5" // Matching dashboard background
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#38BFF0", color: "white" }}>
              <TableCell sx={{ color: "white" }}>Candidate</TableCell>
              <TableCell sx={{ color: "white" }}>Position</TableCell>
              <TableCell sx={{ color: "white" }}>Date & Time</TableCell>
              <TableCell sx={{ color: "white" }}>Type</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockMeetings.map(meeting =>
              <TableRow key={meeting.id}>
                <TableCell>
                  {meeting.candidate}
                </TableCell>
                <TableCell>
                  {meeting.position}
                </TableCell>
                <TableCell>
                  {meeting.date}
                </TableCell>
                <TableCell>
                  <Chip
                    label={meeting.type}
                    color={meeting.type === "Online" ? "primary" : "secondary"}
                    size="small"
                    sx={{
                      backgroundColor:
                        meeting.type === "Online" ? "#38BFF0" : "#FF9800",
                      color: "white"
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={meeting.status}
                    color={
                      meeting.status === "Scheduled" ? "warning" : "success"
                    }
                    size="small"
                    sx={{
                      backgroundColor:
                        meeting.status === "Scheduled" ? "#FF9800" : "#4CAF50",
                      color: "white"
                    }}
                  />
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
                    sx={{
                      borderRadius: "8px",
                      bgcolor: "#F57C00",
                      color: "white",
                      "&:hover": { bgcolor: "#FF5722" }
                    }}
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
