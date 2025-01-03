import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLogin.css'; // Ensure consistent styles with LandingPage

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (formData.username === '' || formData.password === '') {
      setError('Username and Password are required!');
    } else {
      setError('');
      navigate('/student-dashboard'); // Redirect after login
    }
  };

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;
  };

  return (
    <>
      {/* Header */}
      <header className="header glassmorphism">
        <div className="header-left">
          <span className="logo" onClick={() =>navigate('/')}>
            Homeoguide
          </span>
        </div>
        <div className="header-right">
          <span className="header-link" onClick={() => navigate('/student-signup')}>
            Sign Up
          </span>
          <span className="header-link" onClick={() => navigate('/')}>
            Back to Home
          </span>
        </div>
      </header>

      {/* Student Login Page Content */}
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
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <a href="/reset-password" className="forgot-password">
            Forgot Password?
          </a>
          <p className="signup-link">
            Don't have an account? <a href="/student-signup">Sign up</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
