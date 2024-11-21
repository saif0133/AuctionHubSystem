import React from "react";
import "./popupsStyle.css";
import NoPayment from "./noPayment";  // Ensure correct path and capitalization
import PublishFees from "./publishFees";  // Ensure correct path and capitalization
import BidFees from "./bidFees";  // Ensure correct path and capitalization
import JoinFees from "./JoinFees";
import RemoveFees from "./RemoveFees"
import LoadingPopup from "./test";
interface PopupMMessageProps {
  closePopup: () => void;
  order: string;
  amount: string;
  description: string;
  customFunction?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;  // Ensure this matches PublishFees prop type
}

const PopupMMessage: React.FC<PopupMMessageProps> = ({ closePopup, order, amount, customFunction, description }) => {
  const outsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).className === "popup") {
      closePopup();
    }
  };

  return (
    <div id="popupBox" className="popup" onClick={outsideClick}>
      <div className="popup-content">
        {order === "noPayment" && <NoPayment />}
        {order === "PublishFees" && <PublishFees amount={amount} closePopup={closePopup} customFunction={customFunction} description={description} />}
        {order === "JoinAuction" && <JoinFees amount={amount} closePopup={closePopup} customFunction={customFunction} description={description} />}
        {order === "bidFees" && <BidFees amount={amount} closePopup={closePopup} description={description} />}
        {order === "RemoveFees" && <RemoveFees amount={amount} closePopup={closePopup} description={description}  customFunction={customFunction} />}
        {order === "Loading" && <LoadingPopup />}
      </div>
    </div>
  );
};

export default PopupMMessage;
