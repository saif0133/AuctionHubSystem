import "./popUpContent.css";

function noPayment() {
  return (
    <div className="popupMessage">
      <div className="caption-image">
        <img
          className="imgc"
          src="https://raw.githubusercontent.com/saif0133/deploy-sec/main/imgs/Credit%20Card%20Phishing%20Hook.png"
          alt=""
        />
      </div>

      <div className="caption">
        No Payment Method Found: Please add a payment method to proceed with
        your request.
      </div>

      <div className="buttons">
        <button className="next back btn btn-danger popa">Cancle</button>
        <button className="next back btn btn-success popa">Add Account</button>
      </div>
    </div>
  );
}

export default noPayment;
