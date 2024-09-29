import React, { useState } from 'react';

function VarifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState('');
  const [error, setError] = useState('');

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');


  const handleVerify = async () => {
    
    try {
      // Make an API call to verify the email
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
      }
    } catch (err) {
      // Handle network or unexpected errors
      setVerificationStatus('failed');
      setError('An error occurred while verifying your email.');
    }
  
  
  }
  ;

  // Mock function to simulate API call
  const fakeApiVerifyEmail = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true }); // Simulate a successful response
      }, 2000); // Simulate network delay
    });
  };

  return (
    <div className="verify-email-container">
       <a href="/"> <img className="logo" src="https://saifsamplewebsite.netlify.app/imgs/hublogo-2.png" alt="User"></img></a>
      <h2>Confirm Email Activation</h2>
      <p>
        Click the button below to activate your email address. If you didn't request this, please ignore this message.
      </p>
      {verificationStatus === 'success' ? (
        <p>Your email has been successfully activated! Thank you.</p>
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
