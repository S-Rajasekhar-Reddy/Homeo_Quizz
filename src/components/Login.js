import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './Login.css';

const Login = () => {
  const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  function encryptPassword(password) {
    const cipherText = CryptoJS.AES.encrypt(password, secretKey).toString();
    return cipherText;
  }

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
          password: encryptPassword(passWord),
        }),
      });

      if (!response.ok) {
        setSuccess(false);
        throw new Error("Invalid credentials. Please try again.");
      }

      const data = await response.json();

      if (data.Account_type === 's') {
        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/student-dashboard', {state : data});
        }, 1000);
      } else {
        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/instructor-dashboard', {state : data});
        }, 1000);
      }
    } catch (err) {
      setSuccess(false);
      setError(err.message);
    }
  };

  const handleMouseMove = (e) => {
    const imageSection = document.querySelector('.image-section');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const { left, top, width, height } = imageSection.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (mouseX - centerX) / width;
    const deltaY = (mouseY - centerY) / height;

    imageSection.style.transform = `rotateX(${deltaY * 15}deg) rotateY(${deltaX * 15}deg)`;
  };

  // Dynamically duplicate the images for the cloning effect
  useEffect(() => {
    const imageSection = document.querySelector('.image-section');
    const images = Array.from(imageSection.querySelectorAll('.side-image'));

    const clonedImages = images.map((image) => {
      const clone = image.cloneNode(true);
      return clone;
    });

    clonedImages.forEach((clone) => {
      imageSection.appendChild(clone); // Append each cloned image to the container
    });
  }, []);

  return (
    <div className="login-container">
      <div className="homeoguide-heading">
        <h1 className="homeoguide-title">HOMEOGUIDE</h1>
      </div>
      <div className="login-section">
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

            <div className="forgot-password">
              <a href="/reset-password">Forgot Password</a>
            </div>

            <div className="divider">---or--</div>

            <p align="center" className="signup-link">
              Don't have an account? <a href="/student-signup">Sign up</a>
            </p>
          </div>
        </div>

        <div
          className="image-section"
          onMouseMove={handleMouseMove} // Add mouse move event here
        >
          <img src="/1.jpg" alt="Homeopathy" className="side-image" />
          <img src="/2.jpg" alt="Homeopathy" className="side-image" />
          <img src="/13.jpg" alt="Homeopathy" className="side-image" />
          <img src="/6.jpg" alt="Homeopathy" className="side-image" />
          <img src="/15.jpg" alt="Homeopathy" className="side-image" />
          <img src="/5.jpg" alt="Homeopathy" className="side-image" />
          <img src="/17.jpg" alt="Homeopathy" className="side-image" />
          <img src="/4.jpg" alt="Homeopathy" className="side-image" />

        </div>
      </div>
    </div>
  );
};

export default Login;
