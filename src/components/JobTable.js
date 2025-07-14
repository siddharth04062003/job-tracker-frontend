import React from 'react';

const JobTable = ({ jobs, onDelete, onEdit }) => (
  <table className="table w-full">
    <thead>
      <tr>
        <th>Company</th>
        <th>Role</th>
        <th>Status</th>
        <th>Applied Date</th>
        <th>Follow Up</th>
        <th>Notes</th>
        <th>Resume</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {jobs.map((job) => (
        <tr key={job._id}>
          <td>{job.company}</td>
          <td>{job.role}</td>
          <td>{job.status}</td>
          <td>{job.appliedDate ? job.appliedDate.substring(0, 10) : ''}</td>
          <td>{job.followUpDate ? job.followUpDate.substring(0, 10) : ''}</td>
          <td>{job.notes}</td>
          <td>
            {job.resume && (
              <a href={`http://localhost:5000${job.resume}`} target="_blank" rel="noopener noreferrer">
                View
              </a>
            )}
          </td>
          <td>
            <button className="btn btn-xs btn-warning mr-2" onClick={() => onEdit(job)}>
              Edit
            </button>
            <button className="btn btn-xs btn-error" onClick={() => onDelete(job._id)}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default JobTable;