import React from 'react';
import { Calendar, IndianRupee, Briefcase } from 'lucide-react';
import './JobCard.css';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  experience: string;
  deadline: string;
}

const JobCard = ({ 
  title, 
  company, 
  location, 
  type, 
  salaryRange, 
  experience, 
  deadline 
}: JobCardProps) => {
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
        <span className="location">{location}</span>
        <span className="job-type">{type}</span>
      </div>
      
      <button className="apply-btn">Apply Now</button>
    </div>
  );
};

export default JobCard;