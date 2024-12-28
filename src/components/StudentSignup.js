import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentSignup.css';  // Import the CSS file

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    // Dummy validation (replace with actual logic)
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required!');
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
    } else {
      setError('');
      // Proceed with signup logic or API call
      navigate('/student-login');  // Redirect to Student Login after successful signup
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Student Signup</h2>

        <input
          type="text"
          name="username"
          className="signup-input"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          className="signup-input"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          className="signup-input"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          className="signup-input"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        {error && <div className="error-message">{error}</div>}

        <button className="signup-button" onClick={handleSignup}>Sign Up</button>

        <br>
        </br>
        <p align="center"> Already have an account? <a  href="/student-login">Login</a></p>
        
           
      </div>
    </div>
  );
};

export default StudentSignup;
