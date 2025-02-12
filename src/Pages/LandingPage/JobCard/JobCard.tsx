import React from "react";
import { Calendar, IndianRupee, Briefcase } from "lucide-react";
import "./JobCard.css";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";

interface JobCardProps {
  title: string;
  company: string;
  jobType: string;
  category: string;
  salaryRange: string;
  experience: string;
  deadline: string;
  no_of_rounds: number; // Added no_of_rounds
  job_description: string; // Added job_description
  comp_desc: string;
}

const JobCard = ({
  title,
  company,
  jobType,
  category,
  salaryRange,
  experience,
  deadline,
  no_of_rounds,
  job_description,
  comp_desc
}: JobCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/applyJobs", {
      state: {
        title,
        company,
        jobType,
        category,
        salaryRange,
        experience,
        deadline,
        no_of_rounds,
        job_description,
        comp_desc
      }
    });
  };

  return (
    <div className="job-card">
      <h3 className="job-title">{title}</h3>
      <p className="company-name">{company}</p>

      <div className="job-info">
        <div className="info-item">
          <IndianRupee size={16} />
          <span>{salaryRange}</span>
        </div>
        <div className="info-item">
          <Briefcase size={16} />
          <span>{experience}</span>
        </div>
        <div className="info-item">
          <Calendar size={16} />
          <span>{deadline}</span>
        </div>
      </div>

      <div className="job-meta">
        <Chip label={jobType} />
        <Chip label={category} />
        {/* <span className="location">{jobType}</span>
        <span className="job-type">{category}</span> */}
      </div>

      <button className="apply-btn" onClick={handleViewDetails}>
        View Details
      </button>
    </div>
  );
};

export default JobCard;
