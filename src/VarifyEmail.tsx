import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function VarifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(5); // countdown state
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const handleVerify = async () => {
    try {
      const response = await fetch(`http://localhost:8080/verifyEmail?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseData = await response.json();
        setVerificationStatus('failed');
        setError(responseData.message || 'Verification failed.');
      } else {
        setVerificationStatus('success');
        startCountdown(); // Start countdown after successful verification
      }
    } catch (err) {
      setVerificationStatus('failed');
      setError('An error occurred while verifying your email.');
    }
  };

  const startCountdown = () => {
    const countdownInterval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown === 1) {
          clearInterval(countdownInterval);
          window.location.href = "src/final%20project/login-signup%20page/login.html";
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  return (
    <div className="verify-email-container">
      <a href="/"> 
        <img className="logo" src="https://saifsamplewebsite.netlify.app/imgs/hublogo-2.png" alt="User" />
      </a>
      <h2>Confirm Email Activation</h2>
      <p>
        Click the button below to activate your email address. If you didn't request this, please ignore this message.
      </p>
      {verificationStatus === 'success' ? (
        <div> 
          <p>Your email has been successfully activated! Thank you.</p>
          <p>Redirecting you in {countdown}...</p> {/* Display countdown */}
        </div>
      ) : (
        <div>
          <button onClick={handleVerify} className='activea'>Activate Email</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default VarifyEmail;
