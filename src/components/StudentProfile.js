import React, { useState } from 'react';
import './StudentProfile.css';


const StudentProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "John Doe",
    major: "Homeopathy",
    email: "johndoe@example.com",
  });

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  return (
    <div className="student-profile">
      <h2>Student Profile</h2>
      {editMode ? (
        <div className="student-profile-edit-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Major:
            <input
              type="text"
              name="major"
              value={studentData.major}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={studentData.email}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleEdit}>Save Changes</button>
        </div>
      ) : (
        <div className="student-profile-view">
          <p>Name: {studentData.name}</p>
          <p>Major: {studentData.major}</p>
          <p>Email: {studentData.email}</p>
          <button onClick={handleEdit}>Edit Info</button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
