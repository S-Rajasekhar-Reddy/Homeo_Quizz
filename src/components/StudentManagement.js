import React, { useState } from 'react';
import './StudentManagement.css';  // Optional, if you want to add custom styling

const StudentManagement = () => {
  // Sample data for students, you can replace this with real data from your backend
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', accessGranted: false, grade: '', remark: '', suggestion: '' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', accessGranted: false, grade: '', remark: '', suggestion: '' }
  ]);

  // Function to grant access to a student
  const grantAccess = (studentId) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, accessGranted: true } : student
    ));
  };

  // Function to revoke access from a student
  const revokeAccess = (studentId) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, accessGranted: false } : student
    ));
  };

  // Handle grading and feedback
  const handleGradeChange = (studentId, value) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, grade: value } : student
    ));
  };

  const handleRemarkChange = (studentId, value) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, remark: value } : student
    ));
  };

  const handleSuggestionChange = (studentId, value) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, suggestion: value } : student
    ));
  };

  return (
    <div className="student-management">
      <h2>Student Management</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Access</th>
            <th>Grade</th>
            <th>Remark</th>
            <th>Suggestion</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => student.accessGranted ? revokeAccess(student.id) : grantAccess(student.id)}>
                  {student.accessGranted ? 'Revoke Access' : 'Grant Access'}
                </button>
              </td>
              <td>
                <input
                  type="text"
                  value={student.grade}
                  onChange={(e) => handleGradeChange(student.id, e.target.value)}
                  placeholder="Enter grade"
                />
              </td>
              <td>
                <textarea
                  value={student.remark}
                  onChange={(e) => handleRemarkChange(student.id, e.target.value)}
                  placeholder="Enter remarks"
                />
              </td>
              <td>
                <textarea
                  value={student.suggestion}
                  onChange={(e) => handleSuggestionChange(student.id, e.target.value)}
                  placeholder="Enter suggestions"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;
