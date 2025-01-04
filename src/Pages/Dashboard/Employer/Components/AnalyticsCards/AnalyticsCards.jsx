import React from 'react';
import { Briefcase, Activity, UserCheck } from 'lucide-react';
import './AnalyticsCards.css';

const AnalyticsCards = ({ totalJobs, activeJobs, totalHired }) => {
  return (
    <div className="analytics-container">
      <div className="analytics-card">
        <div className="card-icon total-jobs">
          <Briefcase size={24} />
        </div>
        <div className="card-content">
          <h3>Total Jobs Posted</h3>
          <p>{totalJobs}</p>
        </div>
      </div>
      <div className="analytics-card">
        <div className="card-icon active-jobs">
          <Activity size={24} />
        </div>
        <div className="card-content">
          <h3>Active Jobs</h3>
          <p>{activeJobs}</p>
        </div>
      </div>
      <div className="analytics-card">
        <div className="card-icon total-hired">
          <UserCheck size={24} />
        </div>
        <div className="card-content">
          <h3>Total Hired</h3>
          <p>{totalHired}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCards;