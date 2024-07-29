import "./popUpContent.css";

function publishFees() {
  return (
    <div className="popupMessage">
      <div className="caption-image">
        <img
          className="imgc"
          src="https://raw.githubusercontent.com/saif0133/deploy-sec/main/imgs/3550712.png"
          alt=""
        />
      </div>

      <div className="caption">
        A refundable fee is required to publish your auction. This fee will be
        returned after the auction ends. For questions, contact support.
      </div>

      <div className="buttons">
        <button className="next back btn btn-danger popa">Cancle</button>
        <button className="next back btn btn-success popa">
          Accept and publish
        </button>
      </div>
    </div>
  );
}

export default publishFees;
