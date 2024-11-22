import "./popUpContent.css";
import TriangleLoader from "./loading";


interface LoadingPopup {
    amount: string;
    closePopup: () => void;
    description :string;
  }

function LoadingPopup(){ 


  return (
    <div className="popupMessage">
      <div className="caption-image">
       
<TriangleLoader />
    </div>
    </div>
  );
};

export default LoadingPopup;
