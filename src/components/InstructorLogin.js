// frontend/src/components/InstructorLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InstructorLogin.css';

const InstructorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check credentials
    if (username === 'instructor' && password === 'password123') {
      setSuccess(true);
      setError(''); // Clear any previous error
      setTimeout(() => {
        // Make sure this path matches the one defined in App.js
        navigate('/instructor-dashboard');
      }, 1000);
    } else {
      setError('Invalid username or password');
      setSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Instructor Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">Login</button>
        </form>

        {/* Show success message when login is successful */}
        {success && <div className="success-message">Login Successful</div>}
      </div>
    </div>
  );
};

export default InstructorLogin;