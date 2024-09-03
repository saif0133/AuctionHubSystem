// let paymentId="";

import { useEffect, useState } from "react";
import { DecodedToken, extractDataFromToken } from "./tokenDecode";

// export const fetchPaymentId = async (): Promise<void> => {
//   try {
//     const userToken = localStorage.getItem('authToken'); // Retrieve token from local storage or another source

//     const response = await fetch('http://localhost:8080/api/stripe/customer-cards', {
//       headers: {
//         'Authorization': `Bearer ${userToken}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data: any[] = await response.json(); // Adjust type if needed

//     if (data.length > 0) {
//       const firstCard = data[0];
//       paymentId = firstCard.id;
//     } else {
//       console.log('No payment methods found');
//     }
//   } catch (error) {
//     console.error('Error fetching payment methods:', error);
//   }
// };

// export const getPaymentId = (): string => paymentId;
let paymentId = "";
let paymentToken = "";
let last4Digits = "";
let cardHolderName = "";
let expMonth = "";
let expYear = "";

let userData: DecodedToken | null = null;

  const token = localStorage.getItem('authToken');
  const data = extractDataFromToken(token);
userData=data;

export const fetchPaymentId = async (): Promise<void> => {
  try {
    const userToken = localStorage.getItem('authToken'); // Retrieve token from local storage or another source

    const response = await fetch('http://localhost:8080/api/stripe/customer-cards', {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: any[] = await response.json(); // Adjust type if needed

    if (data.length > 0) {
      const firstCard = data[0];

      paymentId = firstCard.id;
      paymentToken = firstCard.customer; // Assuming this is the payment token
      last4Digits = firstCard.card.last4;
      cardHolderName = firstCard.billingDetails?.name || userData?.firstName+" "+userData?.lastName; // If cardholder's name is present
      expMonth = firstCard.card.expMonth;
      expYear = firstCard.card.expYear;
      console.log(expYear);
    } else {
      console.log('No payment methods found');
    }
  } catch (error) {
    console.error('Error fetching payment methods:', error);
  }
};

export const getPaymentDetails = () => ({
  paymentId,
  paymentToken,
  last4Digits,
  cardHolderName,
  expMonth,
  expYear,
});
