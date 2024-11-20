import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLogin.css';  // Import the CSS file

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    // Dummy login validation (replace with actual logic)
    if (formData.username === '' || formData.password === '') {
      setError('Username and Password are required!');
    } else {
      setError('');
      // Proceed with login logic or API call
      navigate('/student-dashboard');  // Redirect to Student Dashboard after successful login
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Student Login</h2>
        
        <input
          type="text"
          name="username"
          className="login-input"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          className="login-input"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />

        {error && <div className="error-message">{error}</div>}

        <button className="login-button" onClick={handleLogin}>Login</button>

        <p>Don't have an account? <a href="/student-signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default StudentLogin;
