import React, { useEffect, useState } from "react";
import "./popUpContent.css";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

interface JoinFeesProps {
  amount: string;
  closePopup: () => void;
  description: string;
  customFunction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const JoinFees: React.FC<JoinFeesProps> = ({ amount, closePopup, customFunction, description }) => {
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const userToken = localStorage.getItem('authToken') || '';

  const testCharge = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const url = `http://localhost:8080/auctions/join/${description}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });
  
      // Check if the response is JSON or text
      const contentType = response.headers.get('Content-Type') || '';
  
      let result;
      if (contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text(); // Fallback if it's not JSON
      }
  
      console.log('Response:', result);
  
      if (!response.ok) {
        throw new Error(result || 'Failed to join the auction. Please try again.');
      }
  
      message.success("You've successfully joined the auction!");
      closePopup();
  
      // Optionally navigate to another page (e.g., auction details or dashboard)
      navigate(`/Product/${description}`);
  
    } catch (error) {
      console.error('Error:', error);
      message.error((error as Error).message);
    }
  };
  

  return (
    <div className="popupMessage">
      <div className="caption-image">
        <img
          className="imgc"
          src={userToken?"https://raw.githubusercontent.com/saif0133/deploy-sec/main/imgs/3550712.png":"https://cdn-icons-png.flaticon.com/512/2250/2250207.png"}
          alt="Publish Fees"
        />
      </div>

     {userToken&&(
         <div className="caption">
         A refundable fee of <span style={{ color: '#992427' }}>{amount}$</span> is required to join this auction. This fee will be
         returned after the auction ends. For questions, contact support.
       </div>
     )}
{!userToken&&(
         <div className="caption">
        You Should Login First to be able to join the Auction
       </div>
     )}
      <div className="buttons">
        <button
          className="btn btn-danger popa"
          onClick={closePopup}
        >
          Cancel
        </button>
       {userToken&&( <button
          className="btn btn-success popa"
          onClick={testCharge}
        >
          Accept and Join
        </button>)}
        {!userToken&&(<button
  className="btn btn-success popa"
  onClick={() => navigate(`http://localhost:5173/src/final%20project/login-signup%20page/login.html`)}
>
  Log in
</button>
)}
      </div>
    </div>
  );
};

export default JoinFees;
