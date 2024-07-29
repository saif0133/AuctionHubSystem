import "./product.css";
import PopupMMessage from "./components/PopupMessage";
import { useState } from "react";

let minbid = 100;
let bidValue = 0;
function Product() {
  const userPayment = true;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const elements = document.getElementsByClassName("input__field");

    if (elements.length > 0) {
      const inputElement = elements[0] as HTMLInputElement;
      bidValue = Number(inputElement.value);
    }
    if (bidValue < minbid)
      alert(bidValue + " is not acceptable, min available bid is " + minbid);
    else {
      event.preventDefault();
      setIsPopupOpen(true);
    }
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const order = () => {
    if (userPayment) return "bidFees";
    else return "noPayment";
  };

  return (
    <div className="testmain">
      <div className="prod">
        <div className="owner">
          <div className="owner-pic"></div>
          <div className="owner-name">
            <h2>User Name</h2>
          </div>
        </div>
        <div className="product-info">
          <div className="left">
            <div className="first-pic"></div>
            <div className="additional-pics">
              <div className="pic-1 pro-pic"></div>
              <div className="pic-2 pro-pic"></div>
              <div className="pic-3 pro-pic"></div>
              <div className="pic-4 pro-pic"></div>
              <div className="pic-5 pro-pic"></div>
            </div>
            <div className="form">
              <div className="saif ssa">
                <label className="input">
                  <input className="input__field" type="text" placeholder=" " />
                  <span className="input__label">Bid Amount</span>
                </label>
              </div>
              <div className="note">Min available bid is : {minbid} $</div>
              <button
                type="submit"
                className="btn-secondary btn bid"
                onClick={openPopup}
              >
                Bid
              </button>
              {isPopupOpen && (
                <PopupMMessage closePopup={closePopup} order={order()} />
              )}
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    </div>
  );
}

export default Product;
