import React, { useEffect, useState } from "react";
import "./popUpContent.css";
import { fetchPaymentId, getPaymentDetails } from "./paymentId";
import { charge } from "./charge";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

interface PublishFeesProps {
  amount: string;
  closePopup: () => void;
  description :string;
  customFunction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PublishFees: React.FC<PublishFeesProps> = ({ amount, closePopup, customFunction , description}) => {
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

 

  const testCharge = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
   
        if (customFunction) {
          const id =  await  customFunction(event);
         
        

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
      description: "Publish fees for auction with title" + description
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
          src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/82-512.png"
          alt="Publish Fees"
        />
      </div>

      <div className="caption">
       {description=="FREE" &&("You can remove this auction or bid without any cost, and your reserved amount will be refunded to you")}
       {description=="NOTFREE" &&("Removing this auction or bid will result in the loss of your reserved amount")}
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
          Accept and Delete
        </button>
      </div>
    </div>
  );
};

export default PublishFees;
