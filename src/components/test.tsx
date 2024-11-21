import "./popUpContent.css";
import TriangleLoader from "./loading";


interface LoadingPopup {
    amount: string;
    closePopup: () => void;
    description :string;
  }

function LoadingPopup(){ 


  return (
    <div className="asd">
      <div className="caption-imagel">
       
<TriangleLoader />
    </div>
    </div>
  );
};

export default LoadingPopup;
