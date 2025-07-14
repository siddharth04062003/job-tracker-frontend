import React from 'react';

const statuses = ['Applied', 'Interview', 'Rejected', 'Offer', 'Accepted'];

const StatusDropdown = ({ value, onChange }) => (
  <select name="status" value={value} onChange={onChange} className="input input-bordered w-full">
    {statuses.map(status => (
      <option key={status} value={status}>{status}</option>
    ))}
  </select>
);

export default StatusDropdown; 