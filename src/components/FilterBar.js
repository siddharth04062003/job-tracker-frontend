import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-4 mb-4">
      <select
        value={filter.status}
        onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
        className="input input-bordered"
      >
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
        <option value="Accepted">Accepted</option>
      </select>
      <input
        type="date"
        value={filter.date}
        onChange={e => setFilter(f => ({ ...f, date: e.target.value }))}
        className="input input-bordered"
      />
    </div>
  );
};

export default FilterBar;