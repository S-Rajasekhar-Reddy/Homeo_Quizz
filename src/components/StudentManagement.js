import React, { useState } from 'react';
import './StudentManagement.css';

const StudentManagement = (props) => {
  const tokenData = props.message;
  const [students, setStudentList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [grantedSearchTerm, setGrantedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const apiUrl = process.env.REACT_APP_API_URL;
  const [selectedStudent, setSelectedStudent] = useState(null);


  // Handle tab change
  const handleTabChange = async (tab) =>  {
    // Toggle logic: close if already active
    if (selectedTab === tab) {
      setSelectedTab(null);
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/getStudentDetails`, { // change the database address to prod
        method: "GET",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${tokenData}`
        }
      });
      
      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        throw new Error("No database Connection. Please try again.");
      }
      const rawData = await response.json();
      const students = rawData.map((student, index) => ({
        id: student.Id,
        userName: student.UserName,
        email: student.Email,
        status: student.Status,
        firstName: student.First_Name,
        lastName: student.Last_Name,
        fullName: student.Student_Name,
        contactNum: student.PhoneNum
      }));
      setStudentList(students);
      setSelectedTab(tab);
      
    } catch (err) {
        console.error("Database Connection failed", err);
    }
  };
  // Handle status filter
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle student status updates
  const handleStatusChange = async(id, newStatus) => {
    try {

      const response = await fetch(`${apiUrl}/updateAccess`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${tokenData}`
        },
        body: JSON.stringify({
          student_id: id,
          status: newStatus
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update student status. Please try again.");
      }

      setStudentList(students.map(student => 
        student.id === id ? { ...student, status: newStatus } : student
      ));

    } catch (err) {
      console.error("Database Connection failed", err);
    }
  };
  // REDO: below filter results functionality is getting crashed due to tolowercase conversion when integrated with backend
  // Filter students based on status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName.toString().toLowerCase().includes(searchTerm) || student.email.toString().toLowerCase().includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter granted students
  const grantedStudents = students.filter(student => student.status === 'Approved');
  const filteredGrantedStudents = grantedStudents.filter(student => {
    return student.fullName.toLowerCase().includes(grantedSearchTerm) || student.email.toString().toLowerCase().includes(grantedSearchTerm);
  });

  return (
    <div>
      {/* Tab Navigation */}
      <div className="tab-nav">
        <button onClick={() => handleTabChange('management')} className={selectedTab === 'management' ? 'active' : ''}>Login Permission</button>
        <button onClick={() => handleTabChange('granted')} className={selectedTab === 'granted' ? 'active' : ''}>My Students</button>
      </div>

      {/* Student Login Permission Tab */}
      {selectedTab === 'management' && (
  <div className="student-management-tab">
    {/* Search + Filter */}
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search Students"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        className="search-bar"
      />

      <select
        value={statusFilter}
        onChange={handleStatusFilterChange}
        className="status-filter"
      >
        <option value="All">All Students</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Denied">Denied</option>
      </select>
    </div>

    {/* Header Row */}
    <div className="card-header-row">
      <span>ID</span>
      <span>Name</span>
      <span>Status</span>
      <span>Actions</span>
    </div>

    {/* Student Card List */}
    <div className="student-card-list">
      {filteredStudents.map((student, index) => (
        <div
          className="student-card"
          key={student.id}
          style={{ '--i': index }}
        >
          <span>{student.id}</span>
          <span>{student.fullName}</span>
          <span>{student.status}</span>
          <div className="student-actions">
            <select
              value={student.status}
              onChange={(e) => handleStatusChange(student.id, e.target.value)}
              className="status-dropdown"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Denied">Denied</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      {/* My Students Tab */}
      {selectedTab === 'granted' && (
  <div className="granted-students-tab">
    <input
      type="text"
      placeholder="Search"
      value={grantedSearchTerm}
      onChange={(e) => setGrantedSearchTerm(e.target.value.toLowerCase())}
      className="search-bar"
    />

    {/* Header Row */}
    <div className="card-header-row">
      <span>ID</span>
      <span>Name</span>
      <span>Status</span>
      <span>Actions</span>
    </div>

    {/* Student Card List */}
    <div className="student-card-list">
      {filteredGrantedStudents.map((student, index) => (
        <div
          className="student-card"
          key={student.id}
          style={{ '--i': index }}
        >
          <span>{student.id}</span>
          <span>{student.fullName}</span>
          <span>{student.status}</span>
          <div className="student-actions">
            <button className="view-btn" onClick={() => setSelectedStudent(student)}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
      {selectedStudent && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }}>
    <div style={{
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '500px',
      position: 'relative',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      <button 
  onClick={() => setSelectedStudent(null)} 
  style={{
    position: 'absolute',
    top: '8px',
    right: '10px',
    fontSize: '16px',
    background: 'transparent',
    border: 'none',
    color: '#555',
    cursor: 'pointer',
    padding: '4px',
    lineHeight: '1',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background 0.2s ease-in-out'
  }}
  onMouseOver={(e) => e.currentTarget.style.background = '#f2f2f2'}
  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
>
  &times;
</button>

      <h2>Student Details</h2>
      <p><strong>ID:</strong> {selectedStudent.id}</p>
      <p><strong>Username:</strong> {selectedStudent.userName}</p>
      <p><strong>Email:</strong> {selectedStudent.email}</p>
      <p><strong>Full Name:</strong> {selectedStudent.fullName}</p>
      <p><strong>Phone Number:</strong> {selectedStudent.contactNum}</p>
      <p><strong>Status:</strong> {selectedStudent.status}</p>
    </div>
  </div>
)}
    </div>
  );
};

export default StudentManagement;
