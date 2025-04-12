import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import AdminDashbord from './components/Dashbord/AdminDashbord';
import StudentDashbord from './components/Dashbord/StudentDashbord';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashbord />} />
        <Route path="/student" element={<StudentDashbord />} />
      </Routes>
    </Router>
  );
};

export default App;
