import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';  // Optionally import CSS for reset password styles

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Request code, 2: Verify code, 3: Set new password

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

  const handleResetPassword = async () => {
    if (!newPassword) {
      setMessage('Please enter a new password.');
      return;
    }
    setLoading(true);
    setMessage('');

    // Simulate resetting password
    setTimeout(() => {
      setLoading(false);
      setMessage('Password reset successfully!');
      navigate('/student-login');  // Redirect to login page after password reset
    }, 2000);
  };

  return (
    <div className="reset-password-container">
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
              onChange={(e) => setNewPassword(e.target.value)}
              className="reset-password-input"
            />
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
    </div>
  );
};

export default ResetPassword;
