import React, { useState, useEffect } from 'react';

const initialState = {
  company: '',
  role: '',
  status: '',
  appliedDate: '',
  followUpDate: '',
  notes: '',
  resume: null
};

const JobForm = ({ onSubmit, editingJob, onCancel }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingJob) {
      setForm({
        ...editingJob,
        resume: null // Don't prefill file input
      });
    } else {
      setForm(initialState);
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    onSubmit(formData);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          required
          className="input input-bordered"
        />
        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          required
          className="input input-bordered"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          className="input input-bordered"
        >
          <option value="">Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
          <option value="Accepted">Accepted</option>
        </select>
        <input
          type="date"
          name="appliedDate"
          value={form.appliedDate}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          type="date"
          name="followUpDate"
          value={form.followUpDate}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="input input-bordered"
        />
      </div>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="input input-bordered w-full mt-4"
      />
      <div className="flex gap-2 mt-4">
        <button type="submit" className="btn btn-primary">
          {editingJob ? 'Update Job' : 'Add Job'}
        </button>
        {editingJob && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default JobForm;