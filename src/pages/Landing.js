import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg text-center border border-blue-100">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-700 drop-shadow">Welcome to <span className="text-blue-500">Job Application Tracker</span></h1>
        <p className="mb-8 text-gray-600 text-lg">Track your job applications, set reminders, and stay organized with ease.</p>
        <div className="flex flex-col gap-4 mt-8">
          <Link to="/login" className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow transition">Login</Link>
          <Link to="/register" className="w-full py-3 rounded-lg bg-white border border-blue-600 hover:bg-blue-50 text-blue-700 font-semibold text-lg shadow transition">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
