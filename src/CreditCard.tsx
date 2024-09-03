import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPaymentId, getPaymentDetails } from "./components/paymentId";
import TriangleLoader from "./components/loading";
import LoginWarning from "./components/loginWarning";

function CrediCard() {
  const [hasPaymentDetails, setHasPaymentDetails] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [last4Digits, setLast4Digits] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userToken = localStorage.getItem('authToken') || null;

  const navigate = useNavigate();
 
  useEffect(() => {
    const initializePaymentId = async () => {
      await fetchPaymentId();
      const details = getPaymentDetails(); // Get the details from the fetchPaymentId function
      setHasPaymentDetails(false);

      if (details.paymentId) {
        setCardHolderName(details.cardHolderName);
        setLast4Digits(details.last4Digits);
        setExpiryDate(`${details.expMonth}/${details.expYear}`);
        setHasPaymentDetails(true);
      }

      setIsLoading(false); // Set loading to false after data is fetched
    };

    initializePaymentId();
  }, []);

  const add = () => {
    navigate("/AddCard");
  };

  if (isLoading) {
    return (
      <div className="testmain">
        <TriangleLoader />
      </div>
    );
  }
  if(!userToken)
    return <LoginWarning />;

  if (hasPaymentDetails) {
    return (
      <div className="testmain">
        <div className="credit-card card">
          <div className="credit-card-chip"></div>
          <div className="credit-card-number">**** **** **** {last4Digits}</div>
          <div className="credit-card-name">{cardHolderName}</div>
          <div className="credit-card-expiry">{expiryDate}</div>
          <div className="credit-card-logo">VISA</div>
        </div>
      </div>
    );
  } else {
    return (
      <div onClick={add} className="addNewCard">
        <div className="testmain">
          <div className="credit-card card add-card">
            <div className="addCard">+</div>
            <div className="addCardTxt">Add Payment Method</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CrediCard;
