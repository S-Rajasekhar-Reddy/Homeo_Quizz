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
  const [isSaving, setIsSaving] = useState(false);

  // Handle tab change
  const handleTabChange = async (tab) => {
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
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.fullName}</td>
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
              {filteredGrantedStudents.map(student => (
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
