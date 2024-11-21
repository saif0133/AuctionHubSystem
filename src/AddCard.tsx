 import React, { useState, ChangeEvent } from "react";
 import "./AddCard.css"
import { useNavigate } from "react-router-dom";
import PopupMMessage from "./components/PopupMessage";
 const cardLogos: { [key: string]: string } = {
   visa: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png",
   mastercard: "https://pngimg.com/uploads/mastercard/mastercard_PNG15.png",
   discover:
     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Discover_Card_logo.svg/2560px-Discover_Card_logo.svg.png",
   dinersclub:
     "https://iconape.com/wp-content/png_logo_vector/diners-club-logo3.png",
   jcb: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/2560px-JCB_logo.svg.png",
   amex: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo_%282018%29.svg/2560px-American_Express_logo_%282018%29.svg.png",
   unknown: "",
 }
let paymentID;
 const getCardType = (number: string) => {
   const sanitizedNumber = number.replace(/\s/g, "");
   const prefix = sanitizedNumber.slice(0, 6);
   if (/^4/.test(sanitizedNumber)) return "visa";
   if (/^5[1-5]/.test(sanitizedNumber) || /^2[2-7]/.test(prefix))
     return "mastercard";
   if (/^3[47]/.test(sanitizedNumber)) return "amex";
   if (
     /^6(?:011|5)/.test(sanitizedNumber) ||
     /^64[4-9]/.test(sanitizedNumber) ||
     /^622(?:12[6-9]|1[3-9]|[2-8][0-9]|9[01]|92[0-5])/.test(prefix)
   )
     return "discover";
   if (/^3(?:0[0-5]|[68])/.test(sanitizedNumber)) return "dinersclub";
   if (/^35(?:2[89]|[3-8][0-9])/.test(prefix)) return "jcb";
   return "unknown";
 }
 const AddCard = () => {

   const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
     let value = e.target.value;
     value = value
       .replace(/\s/g, "")
       .replace(/(\d{4})/g, "$1 ")
       .trim();
     setCardNumber(value);
     setCardType(getCardType(value));
   }
   const handleCardNameChange = (e: ChangeEvent<HTMLInputElement>) => {
     setCardName(e.target.value.toUpperCase());
   }
   const handleCardExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
     let value = e.target.value;
     value = value
       .replace(/\s/g, "")
       .replace(/(\d{2})(\d{2})/, "$1/$2")
       .trim();
     setCardExpiry(value);
   }
   const handleCardCVCChange = (e: ChangeEvent<HTMLInputElement>) => {
     setCardCVC(e.target.value);
   }

   
 const [cardNumber, setCardNumber] = useState<string>("**** **** **** ****");
 const [cardName, setCardName] = useState<string>("FULL NAME");
 const [cardExpiry, setCardExpiry] = useState<string>("MM/YY");
 const [cardCVC, setCardCVC] = useState<string>("CVC");
 const [cardType, setCardType] = useState<string>("unknown")
 const userToken = localStorage.getItem('authToken') || '';
 const navigate = useNavigate();
const [isPopupOpen, setIsPopupOpen] =useState(false);

 const addCard = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault();

  const paymentID = localStorage.getItem('paymentMethodId') || 'defaultToken'; // Replace 'defaultToken' with a suitable default if needed

  // Construct the URL with parameters
  const url = `http://localhost:8080/api/stripe/add-card?token=${encodeURIComponent(paymentID)}`;

  console.log('URL being sent:', url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${userToken}`
      }
      // No body is needed since data is sent as URL params
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.text();
    console.log('Response:', result);
    navigate('/Payment');
    

  } catch (error) {
    console.error('Error:', error);
  }
};



 const postData = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault();
  setIsPopupOpen(true);

  const url = 'https://api.stripe.com/v1/tokens'; // Replace with your API endpoint

  // Data to be sent in the POST request
  const data = new URLSearchParams({
    'card[number]': cardNumber,
    'card[exp_month]': cardExpiry[0] + cardExpiry[1],
    'card[exp_year]':  "20"+cardExpiry[3] + cardExpiry[4],
    'card[cvc]': cardCVC
  }).toString();

  console.log('Data being sent:', data);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer pk_test_51PshbnE51UEbJoiHLyTdV15NpCZQR9nMUldeAhPLzO914qQUnKM6ghpl5qPJmdHmKGC4YjQXrWUKD7OMF2zMOTyV007CizBe0l'
      },
      body: data
    });

    if (!response.ok) {
      setIsPopupOpen(false);
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Response:', result);
    paymentID=result.id;
    console.log("---------------------------------------"+ paymentID);
    localStorage.setItem("paymentMethodId",paymentID);
    await addCard(event);
    
  } catch (error) {
    console.error('Error:', error);
    setIsPopupOpen(false);
  }
};


   return (
     <div className="add-card-container">
       <div className="credit-card">
         <div className="credit-card-content">
           <div className="credit-card-logo">
             {cardType !== "unknown" && (
               <img
                 src={cardLogos[cardType]}
                 alt={cardType}
                 className="card-logo"
               />
             )}
           </div>
           <div className="credit-card-chip"></div>
           <div className="credit-card-number">{cardNumber}</div>
           <div className="credit-card-name">{cardName}</div>
           <div className="credit-card-expiry">{cardExpiry}</div>
           <div className="credit-card-cvc">{cardCVC}</div>
         </div>
       </div>
       <div className="form-container">
         <div className="field-container">
           <label htmlFor="name">Name</label>
           <input
             id="name"
             type="text"
             maxLength={20}
             placeholder="FULL NAME"
             onChange={handleCardNameChange}
           />
         </div>
         <div className="field-container">
           <label htmlFor="cardnumber">Card Number</label>
           <input
             id="cardnumber"
             type="text"
             pattern="[0-9]*"
             inputMode="numeric"
             maxLength={19}
             placeholder="**** **** **** ****"
             onChange={handleCardNumberChange}
           />
         </div>
         <div className="field-container">
           <label htmlFor="expirationdate">Expiration (MM/YY)</label>
           <input
             id="expirationdate"
             type="text"
             pattern="[0-9]*"
             inputMode="numeric"
             maxLength={5}
             placeholder="MM/YY"
             onChange={handleCardExpiryChange}
           />
         </div>
         <div className="field-container">
           <label htmlFor="securitycode">Security Code (CVC)</label>
           <input
             id="securitycode"
             type="text"
             pattern="[0-9]*"
             inputMode="numeric"
             maxLength={3}
             placeholder="CVC"
             onChange={handleCardCVCChange}
           />
         </div>
         <button type="button" className="btn btn-primary submit" onClick={postData}>
           Submit
         </button>
       </div>
       {isPopupOpen && (
       <PopupMMessage
                      closePopup={console.log}
                      order={"Loading"}
                      amount={"0"}
                      description={""}
                      customFunction={console.log}
                    />)}
     </div>
   );
 }
 export default AddCard;
