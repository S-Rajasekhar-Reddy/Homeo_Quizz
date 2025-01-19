import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentSignup.css';

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent alphabets in mobile number
    if (name === "mobile" && !/^\d*$/.test(value)) {
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

  const handleSignup = () => {
    if (!formData.firstname || !formData.lastname || !formData.mobile || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required!');
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
    } else {
      setError('');
      setShowPopup(true);  // Show the success message popup
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
            name="firstname"
            className="signup-input"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastname"
            className="signup-input"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </div>

        <input
          type="tel"
          name="mobile"
          className="signup-input"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleInputChange}
          maxLength="10"
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
