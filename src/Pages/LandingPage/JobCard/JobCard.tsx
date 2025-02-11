import React from 'react';
import { Calendar, IndianRupee, Briefcase } from 'lucide-react';
import './JobCard.css';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
  title: string;
  company: string;
  jobType: string;
  category: string;
  salaryRange: string;
  experience: string;
  deadline: string;
}

const JobCard = ({ 
  title, 
  company, 
  jobType, 
  category, 
  salaryRange, 
  experience, 
  deadline 
}: JobCardProps) => {
  const navigate = useNavigate(); // Initialize navigate function

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
        <span className="location">{jobType}</span>
        <span className="job-type">{category}</span>
      </div>
      
      <button className="apply-btn" onClick={() => navigate("/applyJobs")}>View Details</button>
    </div>
  );
};

export default JobCard;
