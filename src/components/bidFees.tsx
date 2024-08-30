import React from "react";
import "./popUpContent.css";

interface BidFeesProps {
  amount: string;
  closePopup: () => void;
}

const BidFees: React.FC<BidFeesProps> = ({ amount, closePopup }) => {
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
        Are you sure you want to bid with amount: {amount}$ ?
      </div>

      <div className="buttons">
        <button className="next back btn btn-danger popa" onClick={closePopup}>
          Cancel
        </button>
        <button className="next back btn btn-success popa">
          Accept and Bid
        </button>
      </div>
    </div>
  );
};

export default BidFees;
