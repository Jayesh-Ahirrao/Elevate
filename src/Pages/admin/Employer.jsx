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

export default function Employers() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(config.doturl.allEmployers) // Replace with actual API URL
      .then((response) => response.json())
      .then((data) => {
        setEmployers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employers:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#11ACE4" }}
      >
        ALL EMPLOYERS
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
          <LoadingCircle/>
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
                  Size
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Company
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employers.map((employer, index) => (
                <TableRow key={employer.employerId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{employer.compName}</TableCell>
                  <TableCell>{employer.compSize}</TableCell>
                  <TableCell>{employer.email}</TableCell>
                  <TableCell>{employer.compUrl}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
