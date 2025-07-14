import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Use your axios instance with JWT
import JobForm from '../components/JobForm';
import FilterBar from '../components/FilterBar';
import JobTable from '../components/JobTable';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState({ status: '', date: '' });
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  const handleAddOrEdit = async (jobData) => {
    try {
      if (editingJob) {
        await api.put(`/jobs/${editingJob._id}`, jobData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setEditingJob(null);
      } else {
        await api.post('/jobs', jobData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchJobs();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
  };

  const filteredJobs = jobs.filter(job => {
    let statusMatch = filter.status ? job.status === filter.status : true;
    let dateMatch = filter.date ? job.appliedDate && job.appliedDate.startsWith(filter.date) : true;
    return statusMatch && dateMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-700 text-center drop-shadow">Job Application Tracker</h1>
        <div className="mb-8">
          <JobForm onSubmit={handleAddOrEdit} editingJob={editingJob} onCancel={() => setEditingJob(null)} />
        </div>
        <div className="mb-8">
          <FilterBar filter={filter} setFilter={setFilter} />
        </div>
        <JobTable jobs={filteredJobs} onDelete={handleDelete} onEdit={handleEditClick} />
      </div>
    </div>
  );
};

export default Dashboard;