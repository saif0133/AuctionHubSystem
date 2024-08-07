import React from "react";
import "./popupsStyle.css";
import noPayment from "./noPayment";
import publishFees from "./publishFees";
import BidFees from "./bidFees";

interface PopupMMessageProps {
  closePopup: () => void;
  order: string;
  amount: number;
}

function PopupMMessage({ closePopup, order, amount }: PopupMMessageProps) {
  const nopay = () => {
    return noPayment;
  };

  const outsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).className === "popup") {
      closePopup();
    }
  };
  if (order === "noPayment")
    return (
      <div>
        <div id="popupBox" className="popup" onClick={outsideClick}>
          <div className="popup-content">{noPayment()}</div>
        </div>
      </div>
    );
  else if (order === "publishFees")
    return (
      <div>
        <div id="popupBox" className="popup" onClick={outsideClick}>
          <div className="popup-content">{publishFees()}</div>
        </div>
      </div>
    );
  else if (order === "bidFees")
    return (
      <div>
        <div id="popupBox" className="popup" onClick={outsideClick}>
          <div className="popup-content">
            <BidFees amount={amount} closePopup={closePopup} />
          </div>{" "}
        </div>
      </div>
    );
  else return null;
}

export default PopupMMessage;
