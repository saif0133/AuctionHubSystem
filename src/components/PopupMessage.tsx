import React from "react";
import "./popupsStyle.css";
import NoPayment from "./noPayment";  // Ensure proper capitalization
import PublishFees from "./publishFees";  // Ensure proper capitalization
import BidFees from "./bidFees";

interface PopupMMessageProps {
  closePopup: () => void;
  order: string;
  amount: string;
}

const PopupMMessage: React.FC<PopupMMessageProps> = ({ closePopup, order, amount }) => {
  const outsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).className === "popup") {
      closePopup();
    }
  };

  return (
    <div id="popupBox" className="popup" onClick={outsideClick}>
      <div className="popup-content">
        {order === "noPayment" && <NoPayment />}
        {order === "publishFees" && <PublishFees amount={amount} closePopup={closePopup} />}
        {order === "bidFees" && <BidFees amount={amount} closePopup={closePopup} />}
      </div>
    </div>
  );
};

export default PopupMMessage;
