import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentSignup.css';

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    phoneNum: '',
    email: '',
    password: '',
    username: '', 
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent alphabets in mobile number
    if (name === "phoneNum" && !/^\d*$/.test(value)) {
      return;
    }

    // Password strength validation
    if (name === "password") {
      if (value.length < 8) {
        setPasswordStrength("Password must be at least 8 characters long.");
      } else if (!/[A-Z]/.test(value)) {
        setPasswordStrength("Password must include at least one uppercase letter.");
      } else if (!/[a-z]/.test(value)) {
        setPasswordStrength("Password must include at least one lowercase letter.");
      } else if (!/\d/.test(value)) {
        setPasswordStrength("Password must include at least one number.");
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        setPasswordStrength("Password must include at least one special character.");
      } else {
        setPasswordStrength("Strong password!");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const checkUsername = async () => {
    try {
      const response = await fetch(`http://localhost:4000/usernameVerification`, { // change the database address to prod
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:formData.username }),
      });

      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        throw new Error("No database Connection. Please try again.");
      }

      return True;

    } catch (err) { 
      console.error("Database Connection failed", err);
    }
  };

  const handleSignup = async () => {
    setFormData({ ...formData, fullName: `${formData.firstName} ${formData.lastName}` });
    if (!formData.firstName || !formData.lastName || !formData.phoneNum || !formData.email || !formData.password || !formData.confirmPassword || !formData.username) {
      setError('All fields are required!');
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
    } else {
      if (checkUsername(formData.username)) {
        try {
          
          const response = await fetch("http://localhost:4000/signup", { // change the database address to prod
            method: "POST",
            headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          
          if (!response.ok) {
            // If the response status is not ok (e.g., 400 or 401), throw an error
            throw new Error("No database Connection. Please try again.");
          }
    
          setError('');
          setShowPopup(true);  // Show the success message popup
          
        } catch (err) {
          console.error("Database Connection failed", err);
        }
      } else {
        setError('Username already exists!');
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/login');  // Redirect to Student Login after closing popup
  };

  return (
    <div className="signup-container">
      {/* HOMEOGUIDE Title Above Signup Form */}
      <div className="homeoguide-title">
        HOMEOGUIDE
      </div>

      <div className="signup-card">
        {/* Updated Create a New Account and Its Quick and Easy text */}
        <h2 className="account-title">Create a new account</h2>
        <p className="quick-easy-text">It’s quick and easy.</p>

        <div className="name-fields">
          <input
            type="text"
            name="firstName"
            className="signup-input"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            className="signup-input"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

          <input
            type="text"
            name="username"
            className="signup-input"
            placeholder="User Name"
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
          type="tel"
          name="phoneNum"
          className="signup-input"
          placeholder="Mobile Number"
          value={formData.phoneNum}
          onChange={handleInputChange}
          maxLength="10"
        />

        <input
          type="password"
          name="password"
          className="signup-input"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {passwordStrength && <p className="password-strength">{passwordStrength}</p>}

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

        <p className="login-link">Already have an account? <a href="/login">Log In</a></p>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Account Created Successfully!</h3>
            <p>Contact the instructor for student dashboard permissions.</p>
            <button onClick={handleClosePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSignup;
