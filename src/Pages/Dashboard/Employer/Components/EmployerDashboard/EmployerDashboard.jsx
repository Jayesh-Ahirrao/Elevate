import React, { useState } from 'react';
import SideNavbar from '../SideNavbar/SideNavbar';
import JobPostForm from '../JobPostForm/JobPostForm';
import JobTable from '../JobTables/JobTable';
import AnalyticsCards from '../AnalyticsCards/AnalyticsCards';
import JobCards from '../JobCards/JobCards';
import './EmployerDashboard.css';

const EmployerDashboard = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  
  const handlePostJob = (newJob) => {
    setJobs([...jobs, { ...newJob, id: Date.now() }]);
    setShowPostForm(false);
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const handleUpdateJob = (updatedJob) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
  };

  return (
    <div className="dashboard-container">
      <SideNavbar 
        onPostJobClick={() => setShowPostForm(true)}
        jobsCount={jobs.length}
      />
      <main className="dashboard-main">
        <AnalyticsCards 
          totalJobs={jobs.length}
          activeJobs={jobs.filter(job => job.status === 'active').length}
          totalHired={jobs.filter(job => job.status === 'filled').length}
        />
        <JobCards jobs={jobs} />
        <JobTable 
          jobs={jobs}
          onDelete={handleDeleteJob}
          onUpdate={handleUpdateJob}
        />
      </main>
      {showPostForm && (
        <JobPostForm 
          onSubmit={handlePostJob}
          onClose={() => setShowPostForm(false)}
        />
      )}
    </div>
  );
};

export default EmployerDashboard;