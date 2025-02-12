import { useState } from "react";
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Select, MenuItem } from "@mui/material";

const dummyData = [
  { id: 1, jobTitle: "Software Engineer", companyName: "Tech Corp", status: "Accepted" },
  { id: 2, jobTitle: "Data Analyst", companyName: "Data Inc.", status: "Rejected" },
  { id: 3, jobTitle: "UI/UX Designer", companyName: "Design Studio", status: "Accepted" },
  { id: 4, jobTitle: "Project Manager", companyName: "Management Ltd.", status: "Rejected" }
];

export default function JobsApplied() {
  const [filter, setFilter] = useState("All");

  const filteredData = filter === "All" ? dummyData : dummyData.filter(job => job.status === filter);

  return (
    <Box sx={{ maxWidth: "100%", mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 3, borderRadius: "8px", boxShadow: "none" }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#38bff0" }}>
          JOBS APPLIED
        </Typography>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ mb: 3, borderRadius: "20px", height: "40px"  }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Job Profile</strong></TableCell>
                <TableCell><strong>Company Name</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.jobTitle}</TableCell>
                  <TableCell>{job.companyName}</TableCell>
                  <TableCell>
                    <Chip 

                      label={job.status} 
                      sx={{
                        backgroundColor:
                          job.status === "Accepted" ? "#38bff0" : "#C60C30",
                        color: "white",
                        cursor: "pointer",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
