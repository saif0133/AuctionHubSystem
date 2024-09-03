import React, { useEffect, useState } from "react";
import "./popUpContent.css";
import { fetchPaymentId, getPaymentDetails } from "./paymentId";
import { charge } from "./charge";

interface PublishFeesProps {
  amount: string;
  closePopup: () => void;
  customFunction?: () => void;
}

const PublishFees: React.FC<PublishFeesProps> = ({ amount, closePopup ,customFunction}) => {
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const initializePaymentId = async () => {
      await fetchPaymentId();
      const details = getPaymentDetails(); // Get the details from the fetchPaymentId function
    setPaymentId(details.paymentId); // Set the paymentId in the state
    };

    initializePaymentId();
  }, []);


  


  const handleAccept = () => {
    setShowPayment(true);
  };

  const testCharge = async () => {
    
    try {
      const success = await charge(amount);
      if (success) {
        customFunction;
      } else {
        console.log('Charge failed');
      }
    } catch (error) {
      console.error('Error in testCharge:', error);
    }
  };
  

  const postData = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const amountInCents = Math.round(parseFloat(amount) * 100);
    if (!paymentId) {
      console.error('Payment ID is not available');
      return;
    }

    const url = 'http://localhost:8080/api/stripe/charge';
    const userToken = localStorage.getItem('authToken') || '';

    const data = {
      paymentMethodId: paymentId,
      amount: amountInCents,
      currency: "usd",
      description: "Publish fees"
    };

    console.log('Data being sent:', JSON.stringify(data, null, 2));

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Response:', result);
      closePopup();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="popupMessage">
      <div className="caption-image">
        <img
          className="imgc"
          src="https://raw.githubusercontent.com/saif0133/deploy-sec/main/imgs/3550712.png"
          alt="Publish Fees"
        />
      </div>

      <div className="caption">
        A refundable fee of <span style={{ color: '#992427' }}>{amount}$</span> is required to publish your auction. This fee will be
        returned after the auction ends. For questions, contact support.
      </div>

      <div className="buttons">
        <button
          className="btn btn-danger popa"
          onClick={closePopup}
        >
          Cancel
        </button>
        <button
          className="btn btn-success popa"
          onClick={testCharge}
        >
          Accept and Publish
        </button>
      </div>
    </div>
  );
};

export default PublishFees;
