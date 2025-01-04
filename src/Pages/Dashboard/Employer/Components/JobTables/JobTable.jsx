import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import './JobTable.css';

const JobTable = ({ jobs, onDelete, onUpdate }) => {
  return (
    <div className="job-table-container">
      <h2>Posted Jobs</h2>
      <table className="job-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.type}</td>
              <td>{job.status}</td>
              <td className="action-buttons">
                <button onClick={() => onUpdate(job)} className="edit-button">
                  <Edit size={18} />
                </button>
                <button onClick={() => onDelete(job.id)} className="delete-button">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;