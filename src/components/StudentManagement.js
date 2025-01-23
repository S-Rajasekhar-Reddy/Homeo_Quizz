import React, { useState } from 'react';
import './StudentManagement.css';

const StudentManagement = (props) => {
  const tokenData = props.message;
  const [students, setStudentList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [grantedSearchTerm, setGrantedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isSaving, setIsSaving] = useState(false);

  // Handle tab change
  const handleTabChange = async (tab) => {
    if (tab === 'management'){
      try {
        const response = await fetch("http://localhost:4000/getStudentAccessList", { // change the database address to prod
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
          name: student.student_name,
          email: student.email,
          status: student.status
        }));
        setStudentList(students);
        setSelectedTab(tab);

      } catch (err) {
        console.error("Database Connection failed", err);
      }
    } else {
      try {
        const response = await fetch("http://localhost:4000/getStudentDetails", { // change the database address to prod
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
    }
  };



  // Handle status filter
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle student status updates
  const handleStatusChange = (id, newStatus) => {
    setStudentList(students.map(student => 
      student.id === id ? { ...student, status: newStatus } : student
    ));
  };

  // REDO: below filter results functionality is getting crashed due to tolowercase conversion when integrated with backend
  // Filter students based on status
  // const filteredStudents = students.filter(student => {
  //   const matchesSearch = student.name.toLowerCase().includes(searchTerm) || student.email.toLowerCase().includes(searchTerm);
  //   const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
  //   return matchesSearch && matchesStatus;
  // });

  // // Filter granted students
  // const grantedStudents = students.filter(student => student.status === 'Approved');
  
  // const filteredGrantedStudents = grantedStudents.filter(student => {
  //   return student.name.toLowerCase().includes(grantedSearchTerm) || student.email.toLowerCase().includes(grantedSearchTerm);
  // });

  return (
    <div>
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
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
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
                <th>Id</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.userName}</td>
                  <td>{student.email}</td>
                  <td>{student.fullName}</td>
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
