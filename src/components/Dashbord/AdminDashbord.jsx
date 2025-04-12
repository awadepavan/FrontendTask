import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminDashboard = ({ changeUser }) => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    roll_number: '',
    class: '',
    section: '',
    attendance: '',
    marks: {
      maths: '',
      science: '',
      english: '',
    },
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('marks.')) {
      const subject = name.split('.')[1];
      setNewStudent((prev) => ({
        ...prev,
        marks: {
          ...prev.marks,
          [subject]: value,
        },
      }));
    } else {
      setNewStudent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newId = students.length ? students[students.length - 1].id + 1 : 1;
    const studentData = {
      ...newStudent,
      id: newId,
      attendance: Number(newStudent.attendance),
      marks: {
        maths: Number(newStudent.marks.maths),
        science: Number(newStudent.marks.science),
        english: Number(newStudent.marks.english),
      },
    };
    setStudents((prev) => [...prev, studentData]);
    setNewStudent({
      name: '',
      roll_number: '',
      class: '',
      section: '',
      attendance: '',
      marks: { maths: '', science: '', english: '' },
    });
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleLogout = () => {
    // localStorage.removeItem("loggedInUser");
    // changeUser(null);
    window.location.reload(); // Reload the page
    window.location.href = '/'; // Navigate to login page
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-100 to-pink-50 py-10 px-6 font-sans">
      {/* Slogan */}
      <div className="overflow-hidden whitespace-nowrap mb-6">
        <motion.div
          className="text-2xl font-bold text-blue-600 animate-marquee"
          animate={{ x: ['100%', '-100%'] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          Empowering Education through Simplicity – for Future Leaders
        </motion.div>
      </div>

      {/* Logout button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-5xl font-bold text-center text-purple-700 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* Form to Add Student */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-12 border border-purple-200">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">Add New Student</h2>
          <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1 text-gray-700">Name</label>
              <input type="text" name="name" value={newStudent.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">Roll Number</label>
              <input type="text" name="roll_number" value={newStudent.roll_number} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">Class</label>
              <input type="text" name="class" value={newStudent.class} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">Section</label>
              <input type="text" name="section" value={newStudent.section} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">Attendance (%)</label>
              <input type="number" name="attendance" value={newStudent.attendance} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>

            {/* Marks */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Maths Marks</label>
              <input type="number" name="marks.maths" value={newStudent.marks.maths} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">Science Marks</label>
              <input type="number" name="marks.science" value={newStudent.marks.science} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">English Marks</label>
              <input type="number" name="marks.english" value={newStudent.marks.english} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
            </div>

            <div className="col-span-full">
              <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition">
                Add Student
              </button>
            </div>
          </form>
        </div>

        {/* Student List */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-purple-200 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6">Student List</h2>
          {students.length === 0 ? (
            <p className="text-gray-500">No students added yet.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead className="bg-purple-100 text-purple-800">
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Roll No</th>
                  <th className="border px-4 py-2">Class</th>
                  <th className="border px-4 py-2">Section</th>
                  <th className="border px-4 py-2">Attendance</th>
                  <th className="border px-4 py-2">Maths</th>
                  <th className="border px-4 py-2">Science</th>
                  <th className="border px-4 py-2">English</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-100 transition">
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.roll_number}</td>
                    <td className="border px-4 py-2">{student.class}</td>
                    <td className="border px-4 py-2">{student.section}</td>
                    <td className="border px-4 py-2">{student.attendance}%</td>
                    <td className="border px-4 py-2">{student.marks.maths}</td>
                    <td className="border px-4 py-2">{student.marks.science}</td>
                    <td className="border px-4 py-2">{student.marks.english}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Custom CSS for marquee animation */}
      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
