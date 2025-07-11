import React, { useState } from 'react';
import './StudentProfile.css';


const StudentProfile = (props) => {
  const tokenData = props.message.tokenData;
  const [editMode, setEditMode] = useState(false);
  const [studentData, setStudentData] = useState(props.message.params);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSave = async () => {
    try {

      const response = await fetch(`${apiUrl}/updateStudentDetails/`+studentData.id, { // change the database address to prod
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${tokenData}`
        },
        body: JSON.stringify({studentData})
      });
      
      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        throw new Error("No database Connection. Please try again.");
      }

      setEditMode(!editMode);

    } catch (err) {
      console.error("Database Connection failed", err);
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNum" && !/^\d*$/.test(value)) {
      return;
    }

    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  return (
    <div className="student-profile">
      {editMode ? (
        <div className="student-profile-edit-form">
          <p>Id: {studentData.id}</p>
          <p>User Name: {studentData.userName}</p>
          <label>Email: <input type="email" name="email" value={studentData.email} onChange={handleChange}/></label>
          <p>First Name: {studentData.firstName}</p>
          <p>Last Name: {studentData.lastName}</p>
          <label>Contact Number: <input type="tel" name="contactNum" value={studentData.contactNum} onChange={handleChange} maxLength="10"/></label>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      ) : (
        <div className="student-profile-view">
          <p>Id: {studentData.id}</p>
          <p>User Name: {studentData.userName}</p>
          <p>Email: {studentData.email}</p>
          <p>First Name: {studentData.firstName}</p>
          <p>Last Name: {studentData.lastName}</p>
          <p>Contact Number: {studentData.contactNum ? studentData.contactNum : 'NA'}</p>
          <button onClick={handleEdit}>Edit Info</button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
