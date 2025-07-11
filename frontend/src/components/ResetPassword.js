import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // Optionally import CSS for reset password styles

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Request code, 2: Verify code, 3: Set new password
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup

  const handleRequestReset = async () => {
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }
    setLoading(true);
    setMessage('');

    // Simulate sending reset code
    setTimeout(() => {
      setLoading(false);
      setMessage('A reset code has been sent to your email.');
      setStep(2); // Move to step 2 (Enter reset code)
    }, 2000);
  };

  const handleVerifyCode = async () => {
    if (!resetCode) {
      setMessage('Please enter the reset code.');
      return;
    }
    setLoading(true);
    setMessage('');

    // Simulate verifying the reset code
    setTimeout(() => {
      setLoading(false);
      setMessage('Code verified! Now, set a new password.');
      setStep(3); // Move to step 3 (Set new password)
    }, 2000);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    // Password strength validation
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
  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      setMessage('Please enter a new password.');
      return;
    }

    // Check if the password meets the required policies before resetting
    if (passwordStrength !== "Strong password!") {
      setMessage('Please ensure your password meets all the required policies.');
      return;
    }

    setLoading(true);
    setMessage('');

    // Simulate resetting password
    setTimeout(() => {
      setLoading(false);
      setMessage('Password reset successfully!');
      setShowSuccessPopup(true); // Show the success popup after password reset
    }, 2000);
  };

  // Function to close the success popup and redirect to login page
  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    navigate('/login'); // Redirect to login after the popup closes
  };

  return (
    <div className="reset-password-container">
      <div className="homeoguide-heading">
        <h1 className="homeoguide-title">HOMEOGUIDE</h1>
      </div>
      <div className="reset-password-card">
        <h2>Reset Password</h2>

        {/* Step 1: Request Reset Code */}
        {step === 1 && (
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="reset-password-input"
            />
            <button
              onClick={handleRequestReset}
              disabled={loading}
              className="reset-password-button"
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </div>
        )}

        {/* Step 2: Verify Reset Code */}
        {step === 2 && (
          <div>
            <input
              type="text"
              placeholder="Enter reset code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              className="reset-password-input"
            />
            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className="reset-password-button"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </div>
        )}

        {/* Step 3: Set New Password */}
        {step === 3 && (
          <div>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={handlePasswordChange}
              className="reset-password-input"
            />
            <div className="password-strength">
              {passwordStrength && <p>{passwordStrength}</p>}
            </div>
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="reset-password-button"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        )}

        {/* Show message */}
        {message && <div className="reset-password-message">{message}</div>}
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <h3>Password Reset Successfully!</h3>
            <p>Your password has been reset successfully. You will be redirected to the login page shortly.</p>
            <button onClick={handlePopupClose} className="reset-password-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
