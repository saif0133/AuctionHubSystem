import React from "react";
import "./popUpContent.css";

interface BidFeesProps {
  amount: string;
  description: string;
  closePopup: () => void;
}

const BidFees: React.FC<BidFeesProps> = ({ amount, closePopup ,description }) => {

  const userToken = localStorage.getItem('authToken') || '';  // Fetch the token from localStorage

  const makeBid = async () => {
    const url = 'http://localhost:8080/bid/make';  // Replace with your actual API URL
  
    const bodyData = {
      auctionId: description,
      amount: amount,
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`  // Attach the Bearer token
        },
        body: JSON.stringify(bodyData),  // Send the body as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to place the bid');
      }
  
      const result = await response.json();
      console.log('Bid successful:', result);
  
      return result;  // Return the response if needed for further actions
  
    } catch (error) {
      console.error('Error placing bid:', error);
      throw error;  // Handle or rethrow the error if necessary
    }
  };
  
  return (
    <div className="popupMessage">
      <div className="caption-image">
        <img
          className="imgc"
          src="https://raw.githubusercontent.com/saif0133/deploy-sec/main/imgs/bid.png"
          alt="Bid"
        />
      </div>

      <div className="caption">
        Are you sure you want to bid with amount: <span style={{ color: '#992427' }}>{amount}$</span> ?
      </div>

      <div className="buttons">
        <button className="next back btn btn-danger popa" onClick={closePopup}>
          Cancel
        </button>
        <button className="next back btn btn-success popa" onClick={makeBid}>
          Accept and Bid
        </button>
      </div>
    </div>
  );
};

export default BidFees;
