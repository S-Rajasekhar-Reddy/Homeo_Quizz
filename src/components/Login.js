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
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: passWord,
        }),
      });

      if (!response.ok) {
        setSuccess(false);
        throw new Error("Invalid credentials. Please try again.");
      }

      const data = await response.json();

      if (data[0].Account_type === 'i') {
        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/instructor-dashboard');
        }, 1000);
      } else {
        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/student-dashboard');
        }, 1000);
      }
    } catch (err) {
      setSuccess(false);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="homeoguide-heading">
        <h1 className="homeoguide-title">HOMEOGUIDE</h1> {/* Added HOMEOGUIDE heading */}
      </div>
      <div className="login-card">
        <h4>Login</h4>
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

          {success && <div className="success-message">Login Successful</div>}

          {/* Spacing between login button and forgot password */}
          <div className="forgot-password">
            <a href="/reset-password">Forgot Password</a>
          </div>

          {/* Horizontal Divider */}
          <div className="divider">---or--</div>

          {/* Don't have an account section */}
          <p align="center" className="signup-link">
            Don't have an account? <a href="/student-signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
