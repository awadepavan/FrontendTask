// src/AuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../utils/LocalStorage.jsx'; 

// Create the context
export const StudentContext = createContext();

// Create the provider component
const AuthProvider = ({ children }) => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    // Check if localStorage is already initialized
    const { students } = getLocalStorage();
    
    if (students.length === 0) {
      // If no students are found, initialize localStorage
      console.log("No students found, initializing local storage.");
      setLocalStorage();
    }

    // Fetch data from localStorage
    const { students: updatedStudents } = getLocalStorage();
    console.log("Students fetched from local storage:", updatedStudents);
    setStudentsData(updatedStudents);
  }, []);

  return (
    <StudentContext.Provider value={studentsData}>
      {children}
    </StudentContext.Provider>
  );
};

export default AuthProvider;