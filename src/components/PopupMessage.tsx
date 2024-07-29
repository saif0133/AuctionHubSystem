import React from "react";
import "./popupsStyle.css";
import noPayment from "./noPayment";
import publishFees from "./publishFees";
import bidFees from "./bidFees";

interface PopupMMessageProps {
  closePopup: () => void;
  order: string;
}

function PopupMMessage({ closePopup, order }: PopupMMessageProps) {
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
          <div className="popup-content">{bidFees()}</div>
        </div>
      </div>
    );
}

export default PopupMMessage;
