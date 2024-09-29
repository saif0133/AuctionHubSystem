import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPaymentId, getPaymentDetails } from "./components/paymentId";
import TriangleLoader from "./components/loading";
import LoginWarning from "./components/loginWarning";
interface BillingDetails {
  address: {
    city: string | null;
    country: string | null;
    line1: string | null;
    line2: string | null;
    postalCode: string | null;
    state: string | null;
  };
  email: string | null;
  name: string | null;
  phone: string | null;
}

interface Charge {
  amount: string;
  description: string;
  date: string;
  receiptUrl?: string;
  status: string;
}


interface ResponseData {
  data: Charge[];
}

interface FormattedCharge {
  amount: string;
  description: string;
 // receiptNumber: string;
 receiptUrl: string;
}
function CrediCard() {
  const [hasPaymentDetails, setHasPaymentDetails] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [PaymentID, SetPaymentID] = useState("");
  const [last4Digits, setLast4Digits] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [data, setData] = useState([]);
  const [charges, setCharges] = useState<FormattedCharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userToken = localStorage.getItem("authToken") || null;
  // const data = [
  //   { amount: '100 $', description: 'Payment for item A', date: '2024-09-01' },
  //   { amount: '250 $', description: 'Payment for item B', date: '2024-09-02' },
  //   // Add more rows as needed
  // ];


  /*const fetchStripeCharges = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/stripe/listCharges/${PaymentID}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${userToken} ` , // Replace with your actual token
              'Content-Type': 'application/json'
            },
        });
console.log(PaymentID);
        if (!response.ok) {
          //  throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Read the response as text first
        const textResponse = await response.text();
        
        // Attempt to parse the response as JSON
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(textResponse);
        } catch (e) {
            console.error("Failed to parse JSON response:", e);
            // Handle or sanitize the text response as needed here
            jsonResponse = { error: "Failed to parse JSON response" }; // Example fallback
        }

        console.log("Successfully fetched charges:", jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { error };
    }
};
*/
  
  

const postData = async () => {
  const url = `http://localhost:8080/api/stripe/listCharges/${localStorage.getItem("payID")}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
   // console.log('Response*****:', result);

    // Transform the response into the desired format
    const formattedData = result.data.map((charge: { amount: number; description: any; created: number; receipt_url: any; status: any; }) => ({
      amount: `${charge.amount / 100} $`, // Convert amount to dollars
      description: charge.description,
      date: new Date(charge.created * 1000).toISOString().split('T')[0], // Convert timestamp to date
      receiptUrl: charge.receipt_url,
      status: charge.status
    }));
setData(formattedData);
   // console.log('Formatted Data:', formattedData);
    return formattedData;

  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

  

//postData();
  
   




  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
   // marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: '#f3f3f3',
    borderBottom: '2px solid #e0e0e0',
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '14px',
  };

  const tdStyle: React.CSSProperties = {
    borderBottom: '1px solid #e0e0e0',
    padding: '12px 15px',
    fontSize: '14px',
  };

  const trStyle: React.CSSProperties = {
    transition: 'background-color 0.3s ease',
  };

  const trHoverStyle: React.CSSProperties = {
    backgroundColor: '#FF0000',
  };


  const navigate = useNavigate();
 

   
   
    const initializePaymentId = async () => {
      await fetchPaymentId();
      const details = getPaymentDetails(); // Get the details from the fetchPaymentId function
      setHasPaymentDetails(false);

      if (details.paymentId) {
        SetPaymentID(details.paymentId);
        localStorage.setItem("payID",details.paymentId);
        setCardHolderName(details.cardHolderName);
        setLast4Digits(details.last4Digits);
        setExpiryDate(`${details.expMonth}/${details.expYear}`);
        setHasPaymentDetails(true);
        postData(); 
      }

      setLoading(false); // Set loading to false after data is fetched
    };

    useEffect(() => {
      initializePaymentId();
    }, []); 
  

  const add = () => {
    navigate("/AddCard");
  };

  if (loading) {
    return (
      <div className="testmain">
        <TriangleLoader />
      </div>
    );
  }
  if(!userToken)
    return <LoginWarning />;

  if (hasPaymentDetails) {
    return (
      <div className="testmain">
         <div className="formTitle" id="formTitle">
       My credit card
      </div>
        <div className="credit-card card">
          <div className="credit-card-chip"></div>
          <div className="credit-card-number">**** **** **** {last4Digits}</div>
          <div className="credit-card-name">{cardHolderName}</div>
          <div className="credit-card-expiry">{expiryDate}</div>
          <div className="credit-card-logo">VISA</div>
        </div>
        
        <div className="formTitle" id="formTitle">
       My Payments
      </div>
      
      <div className="recipte">
     
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Receipt URL</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
  {data.map((row: Charge, index: React.Key | null | undefined) => (
    <tr
      key={index}
      style={trStyle}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFCCCC')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      <td style={tdStyle}>{row.amount}</td>
      <td style={tdStyle}>{row.description}</td>
      <td style={tdStyle} ><a className="linkR" href={row.receiptUrl} target="_blank">{row.date}</a></td>
      <td style={tdStyle} className="tda">
        {row.status === 'succeeded' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square-fill" viewBox="0 0 16 16">
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
        </svg>
        )}
        
      </td>    
    </tr>
  ))}
</tbody>

      </table>
    </div>
      </div>
    );
  } else {
    return (
      <div className="testmain">
      <div onClick={add} className="addNewCard">
       
          <div className="credit-card card add-card">
            <div className="addCard">+</div>
            <div className="addCardTxt">Add Payment Method</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CrediCard;
