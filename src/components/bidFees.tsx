import "./popUpContent.css";

function bidFees() {
  const amount = 5000;
  return (
    <div className="popupMessage">
      <div className="caption-image">
        <img
          className="imgc"
          src="https://raw.githubusercontent.com/saif0133/deploy-sec/main/imgs/bid.png"
          alt=""
        />
      </div>

      <div className="caption">
        Are you sure you want to bid with amount : {amount}$ ?
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

export default bidFees;
