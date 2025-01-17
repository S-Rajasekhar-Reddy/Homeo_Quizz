import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", { // change the database address to prod
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName,
          password: passWord, }),
      });

      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        setSuccess(false);
        throw new Error("Invalid credentials. Please try again.");
      }

      const data = await response.json();
      // Handle successful login (e.g., save token, redirect)

      if (data[0].Account_type === 'i') {
        setSuccess(true);
        setError(''); // Clear any previous error
        setTimeout(() => {
          // Make sure this path matches the one defined in App.js
          navigate('/instructor-dashboard');
        }, 1000);
      } else {
        setSuccess(true);
        setError(''); // Clear any previous error
        setTimeout(() => {
          // Make sure this path matches the one defined in App.js
          navigate('/student-dashboard');
        }, 1000);
      }
    } catch (err) {
      setSuccess(false);
      console.error("Login failed", err);
      setError(err.message); // Set error message for display
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={passWord}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
        </div>

        {/* Show success message when login is successful */}
        {success && <div className="success-message">Login Successful</div>}
      </div>
    </div>
  );
};

export default Login;