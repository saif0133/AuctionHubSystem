import React from "react";
import { useNavigate } from "react-router-dom";

let a = 0;

const number = 4444;
const name = "Saif Reda Alsaeed Alsaied";
const date = "12 / 24";

function CrediCard() {
  const navigate = useNavigate();

  const add = () => {
    navigate("/AddCard");
  };

  if (a === 1) {
    return (
      <div className="testmain">
        <div className="credit-card card">
          <div className="credit-card-chip"></div>
          <div className="credit-card-number">**** **** **** {number}</div>
          <div className="credit-card-name">{name}</div>
          <div className="credit-card-expiry">{date}</div>
          <div className="credit-card-logo">VISA</div>
        </div>
      </div>
    );
  } else {
    return (
      <a onClick={add} target="_blank" className="addNewCard">
        <div className="testmain">
          <div className="credit-card card add-card">
            <div className="addCard">+</div>
            <div className="addCardTxt">Add Payment Method</div>
          </div>
        </div>
      </a>
    );
  }
}

export default CrediCard;
