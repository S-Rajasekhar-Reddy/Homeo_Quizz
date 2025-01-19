import React, { useState } from 'react';
import './StudentManagement.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', avgScore: '80%', quizAttempts: 5, passFail: 'Passed', status: 'Approved' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', avgScore: '89%', quizAttempts: 3, passFail: 'Passed', status: 'Approved' },
    { id: 3, name: 'Alice Brown', email: 'alice@example.com', avgScore: '70%', quizAttempts: 4, passFail: 'Failed', status: 'Denied' },
    { id: 4, name: 'Bob White', email: 'bob@example.com', avgScore: '76%', quizAttempts: 5, passFail: 'Passed', status: 'Approved' },
  ]);

  const [selectedTab, setSelectedTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [grantedSearchTerm, setGrantedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Handle tab change
  const handleTabChange = (tab) => {
    if (selectedTab === tab) {
      setSelectedTab(null);
    } else {
      setSelectedTab(tab);
    }
  };


  const confirmDelete = () => {
    setStudents(students.filter(student => student.id !== studentToDelete));
    setShowDeleteAlert(false);
  };

  const cancelDelete = () => {
    setShowDeleteAlert(false);
  };

  // Handle status filter
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle student status updates
  const handleStatusChange = (id, newStatus) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, status: newStatus } : student
    ));
  };

  // Filter students based on status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm) || student.email.toLowerCase().includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter granted students
  const grantedStudents = students.filter(student => student.status === 'Approved');
  
  const filteredGrantedStudents = grantedStudents.filter(student => {
    return student.name.toLowerCase().includes(grantedSearchTerm) || student.email.toLowerCase().includes(grantedSearchTerm);
  });

  return (
    <div className="student-management">
      <h2>Student Management System</h2>

      {/* Tab Navigation */}
      <div className="tab-nav">
        <button onClick={() => handleTabChange('management')} className={selectedTab === 'management' ? 'active' : ''}>Student Login Permission</button>
        <button onClick={() => handleTabChange('granted')} className={selectedTab === 'granted' ? 'active' : ''}>My Students</button>
      </div>

      {/* Student Login Permission Tab */}
      {selectedTab === 'management' && (
        <div className="student-management-tab">
          <input
            type="text"
            placeholder="Search Students"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="search-bar"
          />
          <select value={statusFilter} onChange={handleStatusFilterChange} className="status-filter">
            <option value="All">All Students</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
          </select>
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.status}</td>
                  <td>
                    {student.status === 'Pending' ? (
                      <>
                        <button onClick={() => handleStatusChange(student.id, 'Approved')}>Approve</button>
                        <button onClick={() => handleStatusChange(student.id, 'Denied')}>Deny</button>
                      </>
                    ) : student.status === 'Approved' ? (
                      <>
                        <button onClick={() => handleStatusChange(student.id, 'Pending')}>Set Pending</button>
                        <button onClick={() => handleStatusChange(student.id, 'Denied')}>Deny</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleStatusChange(student.id, 'Pending')}>Set Pending</button>
                        <button onClick={() => handleStatusChange(student.id, 'Approved')}>Approve</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete Confirmation */}
          {showDeleteAlert && (
            <div className="delete-alert-overlay">
              <div className="delete-alert">
                <p>Are you sure you want to delete this student?</p>
                <button onClick={confirmDelete}>Yes, Delete</button>
                <button onClick={cancelDelete}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* My Students Tab */}
      {selectedTab === 'granted' && (
        <div className="granted-students-tab">
          <h3>My Students</h3>
          <input
            type="text"
            placeholder="Search"
            value={grantedSearchTerm}
            onChange={(e) => setGrantedSearchTerm(e.target.value.toLowerCase())}
            className="search-bar"
          />
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Average Score</th>
                <th>Quiz Attempts</th>
                <th>Pass/Fail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrantedStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.avgScore}</td>
                  <td>{student.quizAttempts}</td>
                  <td>{student.passFail}</td>
                  <td>
                    {/* Open student details in a new window */}
                    <button onClick={() => window.open(`/student-details/${student.id}`, '_blank')}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
