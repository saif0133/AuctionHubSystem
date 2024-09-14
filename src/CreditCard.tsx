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
  amount: number;
  amountCaptured: number;
  amountRefunded: number;
  billingDetails: BillingDetails;
  created: number;
  currency: string;
  description: string | null;
  id: string;
  paid: boolean;
  receiptNumber: string | null;
  receiptUrl: string | null;
}

interface ResponseData {
  data: Charge[];
}

interface FormattedCharge {
  amount: string;
  description: string;
  receiptNumber: string;
  receiptUrl: string;
}
function CrediCard() {
  const [hasPaymentDetails, setHasPaymentDetails] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [last4Digits, setLast4Digits] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [charges, setCharges] = useState<FormattedCharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userToken = localStorage.getItem("authToken") || null;
  const data = [
    { amount: '100 $', description: 'Payment for item A', date: '2024-09-01' },
    { amount: '250 $', description: 'Payment for item B', date: '2024-09-02' },
    // Add more rows as needed
  ];


  const fetchStripeCharges = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/stripe/listCharges/pm_1PyguSE51UEbJoiHQYB3WBaE`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${userToken} ` , // Replace with your actual token
              'Content-Type': 'application/json'
            },
        });

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
 
  useEffect(() => {
    fetchStripeCharges();
    const initializePaymentId = async () => {
      await fetchPaymentId();
      const details = getPaymentDetails(); // Get the details from the fetchPaymentId function
      setHasPaymentDetails(false);

      if (details.paymentId) {
        setCardHolderName(details.cardHolderName);
        setLast4Digits(details.last4Digits);
        setExpiryDate(`${details.expMonth}/${details.expYear}`);
        setHasPaymentDetails(true);
      }

      setLoading(false); // Set loading to false after data is fetched
    };

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
            <th style={thStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              style={trStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFCCCC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <td style={tdStyle}>{row.amount}</td>
              <td style={tdStyle}>{row.description}</td>
              <td style={tdStyle}>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    );
  } else {
    return (
      <div onClick={add} className="addNewCard">
        <div className="testmain">
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
