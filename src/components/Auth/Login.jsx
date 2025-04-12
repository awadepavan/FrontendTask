import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [studentRollNo, setStudentRollNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Dummy validation
    if (adminEmail === 'admin@gmail.com' && adminPassword === 'admin123') {
      navigate('/admin');
    } else {
      alert('Invalid Admin credentials');
    }
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    // Dummy validation for student
    if (studentRollNo === '101' && studentName.toLowerCase() === 'john') {
      navigate('/student'); // Redirect to student dashboard
    } else {
      alert('Invalid Student credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <motion.h1
        className="text-4xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Login Dashboard
      </motion.h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setIsAdmin(true)}
          className={`px-6 py-2 font-semibold rounded-xl shadow ${
            isAdmin
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-blue-300'
          } hover:scale-105 transition`}
        >
          Admin Login
        </button>
        <button
          onClick={() => setIsAdmin(false)}
          className={`px-6 py-2 font-semibold rounded-xl shadow ${
            !isAdmin
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-blue-300'
          } hover:scale-105 transition`}
        >
          Student Login
        </button>
      </div>

      <motion.form
        onSubmit={isAdmin ? handleAdminLogin : handleStudentLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isAdmin ? (
          <>
            <input
              type="email"
              placeholder="Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Roll Number"
              value={studentRollNo}
              onChange={(e) => setStudentRollNo(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </>
        )}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:opacity-90 transition"
        >
          Login
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
