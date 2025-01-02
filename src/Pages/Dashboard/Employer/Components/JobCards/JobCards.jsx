import React from 'react';
import './JobCards.css';

const JobCards = ({ jobs }) => {
  return (
    <div className="job-cards-container">
      {jobs.map(job => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <div className="job-info">
            <p className="company">{job.company}</p>
            <p className="location">{job.location}</p>
          </div>
          <div className="job-type">{job.type}</div>
          <p className="salary">{job.salary}</p>
          <div className={`status ${job.status}`}>{job.status}</div>
        </div>
      ))}
    </div>
  );
};

export default JobCards;