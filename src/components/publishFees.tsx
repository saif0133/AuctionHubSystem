import React, { useState } from "react";
import "./popUpContent.css";
import PaymentComponent from "./stribePayment";

interface PublishFeesProps {
  amount: string;
  closePopup: () => void;
}

const PublishFees: React.FC<PublishFeesProps> = ({ amount, closePopup }) => {
  const [showPayment, setShowPayment] = useState(false);

  const handleAccept = () => {
    setShowPayment(true);
  };

  return (
    <div className="popupMessage">
      (
        <>
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
//              onClick={handleAccept}
            >
              Accept and Publish
            </button>
          </div>
        </>
     
    </div>
  );
}

export default PublishFees;
