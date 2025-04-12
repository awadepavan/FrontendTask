// src/StudentDashboard.js
import React, { useEffect, useState } from 'react';

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [attendanceRange, setAttendanceRange] = useState({ from: '', to: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    const { students } = JSON.parse(localStorage.getItem("students")) || { students: [] };
    setStudents(students);
    setFilteredStudents(students);
  }, []);

  useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (classFilter) {
      filtered = filtered.filter(student => student.class === classFilter);
    }

    if (sectionFilter) {
      filtered = filtered.filter(student => student.section === sectionFilter);
    }

    if (attendanceRange.from || attendanceRange.to) {
      filtered = filtered.filter(student => {
        const attendance = student.attendance;
        return (
          (attendanceRange.from ? attendance >= attendanceRange.from : true) &&
          (attendanceRange.to ? attendance <= attendanceRange.to : true)
        );
      });
    }

    setFilteredStudents(filtered);
  }, [searchTerm, classFilter, sectionFilter, attendanceRange, students]);

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      filteredStudents.map(student =>
        `${student.id},${student.name},${student.roll_number},${student.class},${student.section},${student.attendance},${student.marks?.math || 0},${student.marks?.science || 0},${student.marks?.english || 0}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleLogout = () => {
    // localStorage.removeItem("loggedInUser");
    // changeUser(null);
    window.location.reload(); // Reload the page
    window.location.href = '/'; // Navigate to login page
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-hidden whitespace-nowrap mb-4 bg-blue-100 py-2 rounded shadow">
        <p className="inline-block animate-marquee text-lg font-semibold text-blue-800">
          📚 Welcome to the Student Dashboard – Track, Filter, and Manage Student Records Seamlessly!
        </p>
      </div>

      <style>
        {`
          @keyframes marquee {
            0%   { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 15s linear infinite;
          }
        `}
      </style>

      <h1 className="text-3xl font-bold text-center mb-6">🎓 Student Dashboard</h1>
       {/* Logout button */}
       <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            placeholder="Name or Roll No."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <select
            onChange={(e) => setClassFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="">All Classes</option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Section</label>
          <select
            onChange={(e) => setSectionFilter(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="">All Sections</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Attendance From (%)</label>
          <input
            type="number"
            value={attendanceRange.from}
            onChange={(e) => setAttendanceRange({ ...attendanceRange, from: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Attendance To (%)</label>
          <input
            type="number"
            value={attendanceRange.to}
            onChange={(e) => setAttendanceRange({ ...attendanceRange, to: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
      </div>

      <button
        onClick={handleDownloadCSV}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mb-4"
      >
        📥 Download CSV
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Roll No.</th>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Section</th>
              <th className="border px-4 py-2">Attendance (%)</th>
              <th className="border px-4 py-2">Math</th>
              <th className="border px-4 py-2">Science</th>
              <th className="border px-4 py-2">English</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map(student => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{student.id}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.roll_number}</td>
                <td className="border px-4 py-2">{student.class}</td>
                <td className="border px-4 py-2">{student.section}</td>
                <td className="border px-4 py-2">{student.attendance}</td>
                <td className="border px-4 py-2">{student.marks?.math || 0}</td>
                <td className="border px-4 py-2">{student.marks?.science || 0}</td>
                <td className="border px-4 py-2">{student.marks?.english || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
