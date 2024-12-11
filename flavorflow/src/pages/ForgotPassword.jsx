import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/util.css';
import '../styles/main.css';
// import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a backend call
    setTimeout(() => {
      setMessage("A password reset link has been sent to your email!");
    }, 1000);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Enter your registered email address to reset your password</p>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
